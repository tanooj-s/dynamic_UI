export const FETCH_CATEGORIES_QUERY = 
`match (c:Brokerage)<-[*]-(a:Client)-[*]->(b:Trade)-[]->(l:Company) where tolower(a.name) contains tolower($userName) with *, c.name as bro, c.sebi_no as sebino, c.phone as phone,a.name as cliname,  a.designation as desig,a.pan as pan,b.type as tra,b.volume as vol,b.share_price as sp , b.timestamp as tim,l.name as tradeof limit 50000  return distinct collect(a{bro,sebino,phone,cliname,desig,tra,vol,sp,tim,tradeof,pan}) as client
`;

export const FETCH_BUSINESSES_QUERY = 
`
MATCH (b:Business)-[:IN_CATEGORY]->(c:Category {name: $category})
WHERE toLower(b.name) CONTAINS toLower($searchText)
OPTIONAL MATCH (b)-[:HAS_PHOTO]->(p:Photo)
WITH b, COLLECT(p)[0] AS p
WITH * LIMIT 100
RETURN COLLECT(b {.*, photo: p.id}) AS businesses
`

export const FETCH_USER_INFO_QUERY = `
MATCH (u:User {id: $userId})
MATCH (u)-[:WROTE]->(r:Review)
WITH u, avg(r.stars) AS averageStars
MATCH (u)-[:WROTE]->(:Review)-[:REVIEWS]->(:Business)-[:IN_CATEGORY]-(c:Category)
WITH *, c.name AS category, COUNT(*) AS num ORDER BY num DESC
RETURN u {
  .name, 
  numReviews: toFloat(SIZE((u)-[:WROTE]->(:Review))), 
  categories: COLLECT(category)[..5],
  averageStars
} AS userInfo
`;

export const TRADE_QUERY = 
`
MATCH (c:Brokerage)<-[*]-(a:Client)-[*]-(b:Trade)-[]->(l:Company)
WHERE tolower(a.name) CONTAINS tolower("Theodore") 
WITH *, b.type as tra, b.volume as bol, b.share_price as sp, l.name as tradeof
LIMIT 500 RETURN DISTINCT COLLECT(a{tra,vol,sp,tradeof} AS client
`;
