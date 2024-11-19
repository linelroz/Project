import React from "react";

const Contact = () => {
  return (
    <div className="flex flex-col justify-between items-center my-4 h-[49rem] backdrop-blur-lg px-12 border rounded-lg border-[rgba(255,255,255,.2)] text-white py-10">
      <h1 className="text-4xl select-none font-bold text-[#F2613F]">
        برای ارتباط با تیم ما به آیدی زیر در تلگرام پیام دهید یا با شماره‌های
        اعلام شده تماس حاصل نمایید
      </h1>
      <div dir="ltr" className="transition-all absolute bottom-[20rem] flex flex-col gap-10">
        <a
          href="https://t.me/Alidrstkar"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all text-6xl font-bold text-[#F2613F] select-none hover:underline"
        >
          Telegram ID : Alidrstkar
        </a>
        <a
          href="tel:+989135891408"
          className="transition-all text-6xl font-bold text-[#F2613F] select-none hover:underline"
        >
          Tel: +989135891408
        </a>
      </div>
    </div>
  );
};

export default Contact;
