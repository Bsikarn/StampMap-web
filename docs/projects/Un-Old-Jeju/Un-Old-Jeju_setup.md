# คู่มือการติดตั้งโปรเจกต์ Un-Old-Jeju

โปรเจกต์ Un-Old-Jeju เป็น Web Application รูปแบบ Mobile-First ที่ทำระบบสะสมแสตมป์จากเกาะเชจูด้วย Next.js และ TailwindCSS 

## 1. วิธีติดตั้งระบบเริ่มต้น (จากศูนย์)
> ข้อจำกัด: ห้ามใช้ `git clone` เด็ดขาดในขั้นตอนนี้ ให้รันคำสั่งตามลำดับ

รันคำสั่งต่อไปนี้ใน Terminal เพื่อขึ้นโปรเจกต์ใหม่ด้วย Next.js:
1. `npx create-next-app@latest stampmap_web`
   - Use TypeScript? **Yes**
   - Use Tailwind CSS? **Yes**
   - Use `src/` directory? **No**
   - Use App Router? **Yes**
   - Import alias? **Yes (@/*)**
2. เลื่อนเข้าไปในโฟลเดอร์โปรเจกต์: `cd stampmap_web`
3. ทำการติดตั้ง shadcn/ui: `npx shadcn-ui@latest init`
4. ทำการติดตั้ง Lucide React สำหรับใช้งาน Icon ต่างๆ: `npm install lucide-react`
5. ทำการติดตั้ง Zustand สำหรับระบบ State Management: `npm install zustand`

## 2. โครงสร้างและหน้าที่การทำงานของโค้ดหลัก

- `app/layout.tsx`
  - **Purpose:** กำหนดหน้าตาโครงสร้าง HTML หน้าแรกของแอปทั้งหมด
  - **Section 1 (Fonts & Metadata):** โหลดฟอนต์ `Inter` แบบ sans-serif และใส่ตัว Config สำหรับ Viewport ให้แสดงผลบนมือถือได้พอดีโดยผู้ใช้ซูมเข้าออกไม่ได้ (userScalable: false)
  - **Section 2 (Root Component):** คอยฝังเมนูด้านล่างสุด (`BottomNav`) ให้ล็อกติดกับทุกๆหน้า และช่องว่าง `{modal}` เพื่อรองรับการเจาะจง Route แบบทะลุ (Intercepting Routes)

- `app/page.tsx`
  - **Purpose:** ใช้แสดงผลหน้าหลักที่เป็นแผนที่เกาะ และตำแหน่งเข็มหมุดเป้าหมายต่างๆ
  - **Section 1 (Interactivity):** โหลด `useStampStore` มาเช็คว่าตอนนี้ผู้ใช้กำลังใช้แผนที่ไหนอยู่ เปิดปิด GPS Tracker การแจ้งเตือนสถานที่ใกล้เคียง ผ่าน `useState`
  - **Section 2 (Render System):** ทำการเรนเดอร์ `<MapBackground />` แบบ SVG เป็นเกาะรูปทรงต่างๆและเรนเดอร์เข็มหมุด `<MapPins />` ตามพิกัด x, y

- `store/use-stamp-store.ts`
  - **Purpose:** เป็นฐานเก็บข้อมูลหลักระหว่างหน้า (Global State) ว่าผู้ใช้มีแสตมป์กี่ดวงแล้ว
  - **Section 1 (Type Interfaces):** จำกัดชนิดข้อมูลว่า `StampItem` ต้องประกอบไปด้วยคำอธิบายและรูปภาพอะไรบ้าง
  - **Section 2 (State Logic):** จัดการเก็บของต่างๆ ให้อยู่ในรูปแบบ Immutability กล่าวคือเวลาเพิ่มสถานที่เข้าไปใหม่ใน `collectedStamps` ห้าม `.push()` โดยตรง แต่ให้ใช้เครื่องหมาย `...state` แกะกล่องเก่ามาบวกอันใหม่แทนเพื่อหลีกเลี่ยงบัคของ React
