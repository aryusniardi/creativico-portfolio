import assert from 'node:assert/strict';
import test from 'node:test';
import { normalizeCmsData } from '../src/data/cms-normalize.ts';
test('normalizes editor repeaters and native media without changing structured links', () => {
 const links=[{label:'Instagram',url:'https://www.instagram.com/creativico/'}];
 const data=normalizeCmsData({slug:'project',tags:[{value:'Research'}],my_roles:[{value:'Director'}],featured:1,portrait_url:{id:'media',meta:{storageKey:'portrait.webp'}},links},'database-id');
 assert.equal(data.id,'project');
 assert.deepEqual(data.tags,['Research']); assert.deepEqual(data.myRoles,['Director']);
 assert.equal(data.featured,true); assert.deepEqual(data.links,links);
 assert.equal(data.portraitUrl,'/_emdash/api/media/file/portrait.webp');
});
test('keeps explicit portfolio publication dates and ignores CMS system timestamps', () => {
 const date=new Date('2026-07-08T00:00:00Z');
 const data=normalizeCmsData({source_id:'legacy-id',id:'db-id',published_on:date,publishedAt:new Date()},'entry-id');
 assert.equal(data.id,'legacy-id');assert.equal(data.publishedAt,date.toISOString());
 assert.equal(normalizeCmsData({publishedAt:new Date()},'id').publishedAt,undefined);
});
