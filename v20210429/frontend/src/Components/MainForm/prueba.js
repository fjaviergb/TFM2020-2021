const users = [
    { name: 12, color: 'blue' },
    { name: 2, color: 'blue' },
    { name: 3, color: 'green' },
  ];
   
  const usersByColor = users.reduce((acc, value) => {
    // Group initialization
    if (!acc[value.color]) {
      acc[value.color] = [];
    }
   
    // Grouping
    acc[value.color].push(value);
   
    return acc;
  }, {});
  
   
  console.log(usersByColor);
for (const [key, value] of Object.entries(usersByColor)) {
    usersByColor[key] = usersByColor[key].sort((a,b) => {
        return a.name - b.name;
    })
}
    console.log(usersByColor)