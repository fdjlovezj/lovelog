import React from 'react';

const imageUrls = [
  "https://raw.githubusercontent.com/fandunjin/fdjlovezj/main/3d14c32f22120df08506991b2091e01.jpg",
  "https://raw.githubusercontent.com/fandunjin/fdjlovezj/main/50c88a5df01456fddc91ba09d59da5d.jpg",
  "https://raw.githubusercontent.com/fandunjin/fdjlovezj/main/4931770cb13db72b05dcf5a064d0fd0.jpg",
  "https://raw.githubusercontent.com/fandunjin/fdjlovezj/main/a823534214fb1c2dde1941ad187fa83.jpg",
  "https://raw.githubusercontent.com/fandunjin/fdjlovezj/main/b4fdaade8e68cfb9f247a888240c8e2.jpg",
  "https://raw.githubusercontent.com/fandunjin/fdjlovezj/main/bca80986352b3ea9a52d324d1aae0fe.jpg",
  "https://raw.githubusercontent.com/fandunjin/fdjlovezj/main/4baf2bef840a13b758f777f562e4973.jpg",
  "https://raw.githubusercontent.com/fandunjin/fdjlovezj/main/5b9f41b9b8db970e7648cb197cff442.jpg",
  "https://raw.githubusercontent.com/fandunjin/fdjlovezj/main/8a13a184a216b49e6eeb5c3b8489faa.jpg",
  "https://raw.githubusercontent.com/fandunjin/fdjlovezj/main/8d5d93405be8db616e84043992865f9.jpg",
  "https://raw.githubusercontent.com/fandunjin/fdjlovezj/main/8d9111be5f3f88dfca42a9d9ddce442.jpg",
  "https://raw.githubusercontent.com/fandunjin/fdjlovezj/main/31a318e623356afc388c2140508c33d.jpg",
  "https://raw.githubusercontent.com/fandunjin/fdjlovezj/main/49ac162eab8208fa70ecb5e14895140.jpg",
  "https://raw.githubusercontent.com/fandunjin/fdjlovezj/main/62bcef4f146250a1ad0da7ad09859bd.jpg",
  "https://raw.githubusercontent.com/fandunjin/fdjlovezj/main/63c9475fd0e4c82f6bd35123efb59a0.jpg",
  "https://raw.githubusercontent.com/fandunjin/fdjlovezj/main/114c625d0b18de993e86e7c8797b7d9.jpg",
  "https://raw.githubusercontent.com/fandunjin/fdjlovezj/main/117bfbcad5b9c255ec2e2abbab57d28.jpg",
  "https://raw.githubusercontent.com/fandunjin/fdjlovezj/main/584a1700335fae898a4cb75ba760554.jpg",
  "https://raw.githubusercontent.com/fandunjin/fdjlovezj/main/4687cfae3a765469425fcd28c629ad4.jpg",
  "https://raw.githubusercontent.com/fandunjin/fdjlovezj/main/5201f7721c10e15b146f835807188e4.jpg",
  "https://raw.githubusercontent.com/fandunjin/fdjlovezj/main/8313624b756037083d324f403746baa.jpg",
  "https://raw.githubusercontent.com/fandunjin/fdjlovezj/main/9863023a74ee006d8c0558fe999def9.jpg",
  "https://raw.githubusercontent.com/fandunjin/fdjlovezj/main/aef335ecb8df7ae423f6d9afc17ba43.jpg",
  "https://raw.githubusercontent.com/fandunjin/fdjlovezj/main/b3285e6dad58f4372207a6d51074c0e.jpg",
  "https://raw.githubusercontent.com/fandunjin/fdjlovezj/main/bea3d47aa861a179d5f1d98d9a126a3.jpg",
  "https://raw.githubusercontent.com/fandunjin/fdjlovezj/main/c18e2fede28a2343cf0f510836d56a4.jpg",
  "https://raw.githubusercontent.com/fandunjin/fdjlovezj/main/c65907b974256232f7d696ebd0d03df.jpg",
  "https://raw.githubusercontent.com/fandunjin/fdjlovezj/main/d13be8cf1d3915b119660a5f7d416cf.jpg",
  "https://raw.githubusercontent.com/fandunjin/fdjlovezj/main/d758d8beb52f114174efb168f8250cf.jpg",
  "https://raw.githubusercontent.com/fandunjin/fdjlovezj/main/da1a0dbe65d17f1fe8bf817cfac7b3d.jpg",
  "https://raw.githubusercontent.com/fandunjin/fdjlovezj/main/e1d07af9278db3e0c3637768a3ca7b3.jpg",
  "https://raw.githubusercontent.com/fandunjin/fdjlovezj/main/e923d73f29891176c4b5501b73c9050.jpg",
  "https://raw.githubusercontent.com/fandunjin/fdjlovezj/main/ecf311a42d5f19927e2fd1deb215a3f.jpg",
  "https://raw.githubusercontent.com/fandunjin/fdjlovezj/main/ed8c2d342433a4a70f101096ffd0739.jpg",
  "https://raw.githubusercontent.com/fandunjin/fdjlovezj/main/5541b2dc5e3bba9b6c33ee2117e077a.jpg"
];

interface PhotoWallProps {
  customImages?: string[];
}

const PhotoWall: React.FC<PhotoWallProps> = ({ customImages = [] }) => {
  // Combine default images with custom images
  const allImages = [...customImages, ...imageUrls];

  // Split images into 3 columns for better distribution
  const col1 = allImages.slice(0, Math.ceil(allImages.length / 3));
  const col2 = allImages.slice(Math.ceil(allImages.length / 3), Math.ceil(allImages.length / 3) * 2);
  const col3 = allImages.slice(Math.ceil(allImages.length / 3) * 2);

  // Duplicate arrays to create seamless loop effect
  const renderColumn = (images: string[], animateClass: string) => (
    <div className={`flex flex-col gap-4 ${animateClass}`}>
      {/* First set */}
      {images.map((src, i) => (
        <div key={`set1-${i}`} className="relative w-full overflow-hidden rounded-xl">
          <img src={src} alt="Our memory" className="w-full h-auto object-cover opacity-60 hover:opacity-100 transition-opacity duration-500" />
        </div>
      ))}
      {/* Second set for loop */}
      {images.map((src, i) => (
        <div key={`set2-${i}`} className="relative w-full overflow-hidden rounded-xl">
          <img src={src} alt="Our memory" className="w-full h-auto object-cover opacity-60 hover:opacity-100 transition-opacity duration-500" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-rose-50">
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px] z-10" /> {/* Overlay to ensure text readability */}
      <div className="grid grid-cols-3 gap-4 h-[150vh] -translate-y-[20vh] w-[120%] -ml-[10%] opacity-40 md:opacity-50">
        {renderColumn(col1, "animate-scroll-up")}
        {renderColumn(col2, "animate-scroll-down")}
        {renderColumn(col3, "animate-scroll-up")}
      </div>
    </div>
  );
};

export default PhotoWall;