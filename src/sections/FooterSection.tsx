export function FooterSection() {
  return (
    <footer className="relative w-full bg-transparent section-padding px-0 pb-8">
      <div className="border-t border-mono-400 pt-8">
        <div className="font-mono text-[10px] md:text-sm uppercase text-mono-300 tracking-tighter flex flex-row justify-around">
          <div className='px-2 flex flex-col md:flex-row items-start '>
            <p>SADECE ÖFKELİ •&nbsp;</p>
            <p>RC YARI-OTONOM ARAÇ PROJESİ</p>
          </div>
          <div className='flex flex-col items-end'>
            <a href="https://github.com/forzzerino" target="_blank" rel="noopener noreferrer" >
              SİTEYİ BU ÇOCUK YAPTI: 🙋🏻‍♂️
            </a>
            <p className='text-[10px] tracking-widest'>PROJEYİ 8 KİŞİ</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
