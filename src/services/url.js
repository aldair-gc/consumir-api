import URL from 'url';

export default URL({
  base: 'http://aluno.aldairgc.com',
});

useEffect(() => {
  fetch('https://aluno.aldairgc.com/aluno')
    .then((res) => res.json())
    .then((res) => console.log(res));
}, []);
