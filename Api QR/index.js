const img = document.querySelector('img')
const canvas = document.querySelector('canvas')
canvas.width = img.width;
canvas.height = img.height;
const ctx = canvas.getContext('2d')
ctx.drawImage(img, 0, 0);
const src = canvas.toDataURL()

const callApi = () => {
    fetch("http://localhost:3000/people",
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            id: '10',
            name: 'Vũ Bảo Liên',
            address: 'Hải Dương',
            birth: '25/01/2005',
            img: src,
            JWT: 'hhsacfs'
        })
    })
}
callApi();