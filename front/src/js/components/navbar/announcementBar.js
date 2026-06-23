export function createAnnouncementBar() {
  return `
   <div
  id="announcementBar"
  class="
    fixed
    top-0
    left-0
    right-0
    z-[1001]
    transition-transform
    duration-300
    bg-[#6B1A2A]
    text-white
    h-10
    flex
    items-center
    justify-center
  "
>
      <span id="announcementText">
        Free Shipping Across India
      </span>
    </div>
  `;
}
