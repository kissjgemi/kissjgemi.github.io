
const req = new XMLHttpRequest();

req.responseType = 'arraybuffer';  
req.addEventListener('load', (e) => {  
  const arrayBuffer = e.target.response;

  if (!arrayBuffer) {
    alert("LOAD png - No response");
    throw new Error('LOAD png - No response');
  }

  // this the the byte array to decode
  const byteArray = new Uint8Array(arrayBuffer);
});
req.addEventListener('error', () => {  
  throw new Error('LOAD png - An error has occurred on request');
  alert("LOAD png - An error has occurred on request");
});

req.open('GET', 'foo.png', true);  
req.send(); 
