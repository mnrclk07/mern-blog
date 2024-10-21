import React from "react";

function About() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-3 text-center">
        <div>
          <h1 className="text-3xl font font-semibold text-center my-7">
            Blog Hakkında
          </h1>
          <div className="text-md text-gray-500 flex flex-col gap-6">
            <p>
              Hoş Geldiniz! Bu blog, Mehmet Çelik tarafından düşüncelerini ve
              fikirlerini dünyayla paylaşmak için kişisel bir proje olarak
              oluşturuldu. Mehmet, teknoloji, kodlama ve bunların arasındaki her
              şey hakkında yazmayı seven tutkulu bir geliştiricidir.
            </p>
            <p>
              Bu blogda web geliştirme, yazılım mühendisliği ve programlama
              dilleri gibi konularda haftalık makaleler ve eğitimler
              bulacaksınız. Mehmet her zaman yeni teknolojiler öğreniyor ve
              keşfediyor, bu yüzden yeni içerikler için sık sık geri gelmeyi
              unutmayın!
            </p>
            <p>
              Gönderilerimize yorum bırakmanızı ve diğer okuyucularla etkileşime
              girmenizi teşvik ediyoruz. Başkalarının yorumlarını beğenebilir ve
              onlara yanıt verebilirsiniz. Öğrenenlerden oluşan bir topluluğun
              birbirlerinin büyümesine ve gelişmesine yardımcı olabileceğine
              inanıyoruz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
