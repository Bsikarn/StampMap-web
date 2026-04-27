# การตั้งค่าโปรเจกต์ StampMap (Un-Old-Jeju)
    
## การตั้งค่าเริ่มต้น
1. Clone หรือสร้างโปรเจกต์
2. รันคำสั่ง `npm install` เพื่อติดตั้งไลบรารีต่างๆ ที่ระบุใน `package.json` เช่น Next.js, Prisma, Zustand, Tailwind CSS v4 เป็นต้น
3. สร้างไฟล์ `.env` ที่ root directory เพื่อกำหนดค่า `DATABASE_URL` ให้เชื่อมต่อกับ Supabase PostgreSQL
4. รัน `npx prisma db push` เพื่อสร้างและปรับปรุงโครงสร้างตารางในฐานข้อมูล
5. รัน `npm run dev` เพื่อเริ่มต้น Development Server สำหรับการทดสอบ

## โครงสร้างโค้ดและส่วนประกอบหลัก

- `app/api/locations/route.ts`
  - **Purpose:** API Endpoint สำหรับดึงข้อมูลสถานที่บนแผนที่
  - **Section 1:** รับพารามิเตอร์ `zoneName` เพื่อกรองสถานที่ตามเขตแผนที่ (เช่น "Jeju Island" หรือ "Thailand")
  - **Section 2:** ใช้ `prisma.location.findMany` แบบ Explicit Selection เพื่อป้องกันปัญหา Cache และดึงข้อมูลพร้อมกับจำนวน stamp/รีวิว

- `app/api/stamps/route.ts`
  - **Purpose:** API Endpoint สำหรับจัดการการเก็บ Stamp
  - **Section 1:** `GET` กรองหาแสตมป์ตาม `userId` และสามารถดึงเฉพาะเขต (`zoneName`) ได้
  - **Section 2:** `POST` สำหรับบันทึกการแสตมป์สถานที่ใหม่ และตรวจสอบว่าผู้ใช้เคยแสตมป์ที่นี่หรือยังเพื่อป้องกันการเพิ่มข้อมูลซ้ำซ้อน (Conflict 409)

- `app/api/user-books/route.ts`
  - **Purpose:** API สำหรับจัดการสมุดพาสปอร์ตของแต่ละ User (UserBook)
  - **Section 1:** `GET` ดึงรายการหนังสือที่ User เป็นเจ้าของ (ใช้ Explicit Selection ข้าม Region ที่ถูกลบออกไป)
  - **Section 2:** `POST` สำหรับเพิ่มสมุดเล่มใหม่ และ `DELETE` สำหรับลบสมุดที่มีอยู่

- `app/api/souvenirs/route.ts`
  - **Purpose:** API สำหรับดึงข้อมูลและแลกเปลี่ยนของที่ระลึก
  - **Section 1:** ดึงข้อมูลของที่ระลึกทั้งหมด (ไม่มีการกรองด้วย Region อีกต่อไป ทำให้โชว์สินค้าทั้งหมดทั่วโลก)
  - **Section 2:** ใช้ `export const dynamic = 'force-dynamic'` เพื่อป้องกันปัญหาข้อมูลเก่าติด Cache

- `components/auth/AuthWrapper.tsx`
  - **Purpose:** Component ควบคุมการยืนยันตัวตนและการสร้างผู้ใช้แบบ Silent Login (Demo)
  - **Section 1:** ทำการ Auto Login แบบ Guest ให้ผู้ใช้เมื่อเข้าสู่แอปครั้งแรก
  - **Section 2:** ทำการเรียก API `/api/auth/sync` อย่างสม่ำเสมอในทุกๆ Session เพื่อรับประกันว่าข้อมูล User ใน Supabase กับในตาราง `User` ของ Prisma จะตรงกันเสมอ (แก้ปัญหา User หายหลังจาก Reset DB)

- `store/use-stamp-store.ts`
  - **Purpose:** Store จัดการ State ระดับ Global ผ่าน Zustand
  - **Section 1:** จัดการ State ที่เกี่ยวกับภูมิภาค (`selectedMap`), แผนที่ที่มีอยู่ (`availableMaps`), และหนังสือของผู้ใช้ (`userBooks`)
  - **Section 2:** ใช้งาน Async Thunks เพื่อเรียก API แบบ Asynchronous เช่น `fetchLocations(zoneName)`, `fetchSouvenirs()`, และ `fetchStamps(zoneName)`

- `app/book/page.tsx`
  - **Purpose:** หน้า UI สำหรับสมุดพาสปอร์ตเก็บแสตมป์
  - **Section 1:** จัดการ State `selectedBook` ให้ตรงกับสมุดจริงที่มีในคลังของผู้ใช้งาน (`userBooks`)
  - **Section 2:** ดึงข้อมูลที่รวบรวมจาก Zustand (locations, collectedStamps) เพื่อมาแมปเป็นหน้าในสมุด (`stampPages`) ไดนามิก
