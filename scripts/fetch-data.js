const fs = require('fs');
const path = require('path');

async function fetchData() {
  console.log('Fetching user and repos...');
  
  const [userRes, reposRes] = await Promise.all([
    fetch('https://api.github.com/users/ijeziermf'),
    fetch('https://api.github.com/users/ijeziermf/repos?sort=updated&per_page=100')
  ]);

  const user = await userRes.json();
  const repos = await reposRes.json();

  console.log(`Found ${repos.length} repos, fetching READMEs...`);
  
  const reposWithReadmes = await Promise.all(
    repos.map(async (repo) => {
      try {
        const readmeRes = await fetch(`https://api.github.com/repos/ijeziermf/${repo.name}/readme`, {
          headers: { 'Accept': 'application/vnd.github.v3.raw' }
        });
        const readme = readmeRes.ok ? await readmeRes.text() : null;
        return { ...repo, readme: readme?.substring(0, 2000) };
      } catch {
        return { ...repo, readme: null };
      }
    })
  );

  const data = { user, repos: reposWithReadmes };
  
  fs.writeFileSync(
    path.join(__dirname, '..', 'src', 'app', 'data.json'),
    JSON.stringify(data, null, 2)
  );
  
  console.log('Data fetched and saved!');
}

fetchData().catch(console.error);