const fs = require('fs');
const path = require('path');

async function fetchData() {
  const [userRes, reposRes] = await Promise.all([
    fetch('https://api.github.com/users/ijeziermf'),
    fetch('https://api.github.com/users/ijeziermf/repos?sort=updated&per_page=100')
  ]);

  const user = await userRes.json();
  const repos = await reposRes.json();

  const data = { user, repos };
  
  fs.writeFileSync(
    path.join(__dirname, '..', 'src', 'app', 'data.json'),
    JSON.stringify(data, null, 2)
  );
  
  console.log('Data fetched and saved!');
}

fetchData().catch(console.error);