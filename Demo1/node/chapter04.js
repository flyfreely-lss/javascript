/**
 * Created by lss on 2018/10/11.
 */
const buf1 = Buffer.alloc(10);
const buf2 = Buffer.alloc(10, 1);

const buf3 = Buffer.allocUnsafe(10);

const buf4 = Buffer.from([1, 2, 3]);

const buf5 = Buffer.from('tést');

const buf = Buffer.alloc(256);
const len = buf.write('www.qq.com');
console.log("写入字节数："+len);


const buf6 = Buffer.alloc(26);
for (let i = 0; i < 26; i++) {
  buf6[i] += i + 97;
}
console.log( buf6.toString('ascii') );
console.log( buf6.toString('ascii', 0, 5) );
console.log( buf6.toString('utf-8', 0, 5) );
console.log( buf6.toString(undefined, 0, 5) );
