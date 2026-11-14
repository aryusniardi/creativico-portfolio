import { useEffect, useRef } from 'react';

/** Touch keeps native scrolling; mouse dragging shares the same scroll containers. */
export function useDragScroll() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    let gesture: { id: number; x: number; y: number; candidates: HTMLElement[]; active?: HTMLElement; left: number; top: number; snap: string } | null = null;
    let suppressClick = false;
    const finish = () => {
      if (gesture?.active) {
        gesture.active.style.scrollSnapType = gesture.snap;
        root.removeAttribute('data-dragging');
        if (root.hasPointerCapture(gesture.id)) root.releasePointerCapture(gesture.id);
      }
      gesture = null;
    };
    const down = (event: PointerEvent) => {
      suppressClick = false;
      if (event.pointerType !== 'mouse' || event.button !== 0 || !(event.target instanceof Element)) return;
      if (event.target.closest('input, textarea, select, video, [contenteditable="true"], .app-navigation, .mini-player')) return;
      const candidates: HTMLElement[] = [];
      for (let element = event.target.closest<HTMLElement>('*'); element && root.contains(element); element = element.parentElement) {
        const style = getComputedStyle(element);
        if ((/(auto|scroll)/.test(style.overflowX) && element.scrollWidth > element.clientWidth) || (/(auto|scroll)/.test(style.overflowY) && element.scrollHeight > element.clientHeight)) candidates.push(element);
        if (element === root) break;
      }
      if (candidates.length) gesture = { id: event.pointerId, x: event.clientX, y: event.clientY, candidates, left: 0, top: 0, snap: '' };
    };
    const move = (event: PointerEvent) => {
      if (!gesture || event.pointerId !== gesture.id) return;
      const dx = event.clientX - gesture.x;
      const dy = event.clientY - gesture.y;
      if (!gesture.active) {
        if (Math.hypot(dx, dy) < 6) return;
        const horizontal = Math.abs(dx) > Math.abs(dy);
        const active = gesture.candidates.find(element => horizontal ? element.scrollWidth > element.clientWidth : element.scrollHeight > element.clientHeight);
        if (!active) return;
        gesture.active = active;
        gesture.left = active.scrollLeft;
        gesture.top = active.scrollTop;
        gesture.snap = active.style.scrollSnapType;
        active.style.scrollSnapType = 'none';
        root.setAttribute('data-dragging', '');
        root.setPointerCapture(event.pointerId);
        window.getSelection()?.removeAllRanges();
      }
      event.preventDefault();
      gesture.active.scrollLeft = gesture.left - dx;
      gesture.active.scrollTop = gesture.top - dy;
    };
    const up = (event: PointerEvent) => {
      if (!gesture || event.pointerId !== gesture.id) return;
      suppressClick = Boolean(gesture.active) && event.type !== 'pointercancel';
      finish();
      setTimeout(() => { suppressClick = false; }, 0);
    };
    const cancel = () => { suppressClick = false; finish(); };
    const click = (event: MouseEvent) => {
      if (!suppressClick) return;
      event.preventDefault();
      event.stopPropagation();
      suppressClick = false;
    };
    const preventNativeDrag = (event: DragEvent) => { if (gesture) event.preventDefault(); };
    window.addEventListener('blur', cancel);
    root.addEventListener('pointerdown', down);
    document.addEventListener('pointermove', move, { passive: false });
    document.addEventListener('pointerup', up);
    document.addEventListener('pointercancel', up);
    root.addEventListener('click', click, true);
    root.addEventListener('dragstart', preventNativeDrag);
    return () => {
      finish();
      window.removeEventListener('blur', cancel);
      root.removeEventListener('pointerdown', down);
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', up);
      document.removeEventListener('pointercancel', up);
      root.removeEventListener('click', click, true);
      root.removeEventListener('dragstart', preventNativeDrag);
    };
  }, []);
  return ref;
}
