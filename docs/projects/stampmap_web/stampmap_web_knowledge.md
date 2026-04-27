# ความรู้และเทคนิคสำหรับโปรเจกต์ StampMap

## Techniques In Use

### 1. Dynamic Zone Filtering & UserBook Management (การจัดการเขตแผนที่และสมุดพาสปอร์ตส่วนตัว)
- **อธิบาย:** เปลี่ยนจากระบบการกรองข้อมูลแบบ Region ทั่วไปมาเป็นระบบ `zoneName` และ `UserBook` ที่อนุญาตให้ผู้ใช้เป็นเจ้าของพาสปอร์ตของแต่ละพื้นที่ได้อย่างอิสระ (เช่น "Jeju Island" หรือ "Thailand")
- **การทำงาน:** เราเก็บสถานะภูมิภาคปัจจุบันไว้ใน Zustand Store (`selectedMap`) และใช้ชื่อ `zoneName` เป็น query parameter (`?zoneName=...`) ใน API ระบบ API จะทำการดึงข้อมูลเฉพาะโซนนั้นๆ มาแสดงผล และให้ผู้ใช้บริหารสมุดสะสมแสตมป์ของตนเองผ่านตาราง `UserBook`

### 2. Silent Guest Login & Robust Auth Sync (ระบบล็อกอินอัตโนมัติและการซิงค์ข้อมูลผู้ใช้ที่มั่นคง)
- **อธิบาย:** ใช้ `@supabase/ssr` สำหรับ Authentication แต่เพิ่มระบบดักจับ (AuthWrapper) เพื่อให้สามารถทดสอบโปรเจกต์ (Portfolio) ได้ทันทีในฐานะ Guest
- **การทำงาน:** หากผู้ใช้ไม่มี Session, `AuthWrapper` จะใช้ `signInWithPassword` เข้าบัญชีเดโม่ให้อัตโนมัติ หากไม่มีจะทำการ `signUp` สิ่งสำคัญคือ **ในทุกๆ ครั้งที่มีการโหลด Session หรือ Login ระบบจะทำการยิง API ไปยัง `/api/auth/sync` อย่างสม่ำเสมอ** เพื่อรับประกันว่าบัญชีจาก Supabase จะถูกสร้างและมีอยู่จริงในตาราง `public.User` ของ Prisma (ป้องกันปัญหา Foreign Key Error เมื่อ Database ถูก Reset)

### 3. Prisma Explicit Column Selection (การหลีกเลี่ยงปัญหา Schema Caching)
- **อธิบาย:** เมื่อมีการเปลี่ยนแปลงโครงสร้างฐานข้อมูล (เช่น ลบคอลัมน์ `region` ออก) ตัว Next.js และ Turbopack มักจะมีการ Cache ไฟล์ Prisma Client เก่า ทำให้เวลา Query ด้วย `include: true` ระบบจะเกิด Error 500 เพราะพยายามค้นหาคอลัมน์ที่ไม่มีแล้ว
- **การทำงาน:** การใช้ **Explicit Selection** (`select: { id: true, name: true, ... }`) ใน Query (เช่น `findMany` ของ API Locations หรือ UserBook) แทนการใช้ `include: true` ช่วยป้องกันปัญหานี้ได้อย่างสมบูรณ์แบบ เพราะเราบังคับให้ Prisma สร้าง SQL Statement ค้นหาเฉพาะคอลัมน์ที่เราระบุเท่านั้น

### 4. Derived State Calculation (การคำนวณ State แฝงแบบไดนามิก)
- **อธิบาย:** ลดความซ้ำซ้อนของการเก็บ State โดยคำนวณตัวแปรใหม่จาก State หลัก (Single Source of Truth)
- **การทำงาน:** ใน `app/book/page.tsx` หน้าตาของสมุด `stampPages` จะไม่ได้ถูกดึงมาจาก API แยกต่างหาก แต่ถูก map และ derived จาก State 2 ตัวประกอบกัน คือ `locations` และ `collectedStamps`

### 5. Transactional Data Updates (การอัปเดตข้อมูลด้วย Transaction)
- **อธิบาย:** ใช้ Prisma `$transaction` สำหรับ Action สำคัญที่ต้องการความแม่นยำสูง
- **การทำงาน:** สำหรับการแลกของที่ระลึก ระบบจะอ่านของที่ระลึก นับจำนวนแสตมป์ และบันทึกประวัติการแลกภายในบล็อก transaction เดียว หากเกิดข้อผิดพลาดตรงกลาง ข้อมูลทั้งหมดจะถูก rollback เพื่อไม่ให้เกิดข้อผิดพลาดด้านจำนวนแสตมป์
