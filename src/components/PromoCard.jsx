export default function PromoCard() {
    return (
      <div className="p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <PromoCardLarge />
          <div className="flex flex-col gap-4">
            <PromoCardSmall
              title="Dental Care Set for Vivid and Bright Smiles"
              oldPrice="33.90"
              price="22.90"
              image="https://png.pngtree.com/png-vector/20250128/ourmid/pngtree-happy-tooth-with-toothbrush-and-toothpaste-dental-care-illustration-kids-health-png-image_15353859.png"
            />
            <PromoCardSmall
              title="Banana Flavoured Toothpaste"
              oldPrice="37.00"
              price="37.00"
              image="https://www.bebble-cosmetics.com/wp-content/uploads/2014/03/3016-01-023-V2-2022-Bebble_Toothpaste_Banana_50ml-1_TubeBOX_2023_composition.png"
            />
          </div>
        </div>
      </div>
    );
  }
  
  export function PromoCardLarge() {
    return (
      <div className="flex flex-wrap bg-blue-50 rounded-xl p-6 gap-6 items-center w-full">
        <div className="flex flex-col gap-2 flex-1 min-w-0">
          <span className="bg-green text-white text-xs font-nunito-extrabold px-2 py-1 rounded w-max">
            25% OFF
          </span>
          <h3 className="text-xl font-nunito-bold text-black">Black Garlic Oil</h3>
          <p className="text-gray-600 text-sm">
            Stronger and Thicker Hair With Black Garlic Oil.
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="line-through text-gray-400 text-sm">Rp37.00</span>
            <span className="text-lg font-nunito-bold text-black">Rp37.00</span>
          </div>
          <span className="text-xs font-poppins-regular text-gray-500">Including Tax</span>
        </div>
        <div className="w-32 sm:w-40 md:w-48">
          <img
            src="https://bazaarica.com/wp-content/uploads/2024/07/10d2783d-9543-44b3-ba58-20977cd8b331-thumbnail-770x770-1.png"
            alt="Black Garlic Oil"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    );
  }
  
  export function PromoCardSmall({ title, price, oldPrice, image }) {
    return (
      <div className="bg-orange-50 rounded-xl flex items-center p-4 gap-4 w-full">
        <div className="w-20 sm:w-24 md:w-28 min-h-[96px] flex items-center justify-center">
          <img
            src={image}
            alt={title}
            className="w-full h-auto object-contain max-h-24"
          />
        </div>
        <div className="flex flex-col gap-1 min-w-0">
          <span className="bg-green text-white text-xs font-nunito-extrabold px-2 py-1 rounded w-max">
            25% OFF
          </span>
          <h4 className="text-sm font-semibold text-black line-clamp-2">{title}</h4>
          <div className="flex items-center gap-2">
            <span className="line-through text-gray-400 text-sm">Rp{oldPrice}</span>
            <span className="text-base font-nunito-bold text-black">Rp{price}</span>
          </div>
          <span className="text-xs font-poppins-regular text-gray-500">Including Tax</span>
        </div>
      </div>
    );
  }
  