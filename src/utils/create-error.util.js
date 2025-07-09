export default function (statusCode, message) {
  const error = new Error(message); // สร้าง instance(obj ที่ถูกสร้างจาก class) ใหม่ ของ error object ที่มีข้อความกำหนด
  error.statusCode = statusCode; //เพื่ม property "statusCode" เข้าไปใน error
  throw error; //ถูกจับใน middleware หรือ try/catch
}
