// import imageJokowi from '../../../assets/images/post/jokowi.png';
// import { Link } from 'react-router-dom';

const KontakKamiPage = () => {


  return (
    <div className="lg:flex lg:flex-col lg:gap-x-5">
      <section>
        <div className="flex flex-col bg-transparent">
          <div className="flex flex-col md:flex-row w-full gap-5">
            <div className="flex flex-col md:w-9/12 rounded-2xl overflow-hidden bg-white mt-2">
              <div className="flex flex-col lg:flex-row">
                <div className="flex flex-col w-10/12">
                  <p className="p-4 text-black font-bold">
                    HUBUNGI KAMI
                  </p>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row">
                <div className="flex flex-col w-10/12">
                  <p className="p-4 text-black font-bold">
                    Fast Response (24 Jam)
                  </p>
                  <p className="p-6 text-black"><br></br>Pusdalops BPBD Provinsi Sulawesi Tengah</p>
                  <p className="p-6 text-black">Jl. M.T Haryono No.29, Besusu Tengah, Kec. Palu Tim., Kota Palu, Sulawesi Tengah 94118</p>
                  <p className="p-6 text-black">Whatsapp : 08114032247</p>
                  <p className="p-6 text-black">Email : pusdalops.bpbdsulteng@gmail.com</p>
                  {/* <p className="p-6 text-black">
                    <br>"Pusdalops BPBD Provinsi Sulawesi Tengah"</br>
                    <br>"Jl. M.T Haryono No.29, Besusu Tengah, Kec. Palu Tim., Kota Palu, Sulawesi Tengah 94118"</br>
                    <br>"Whatsapp : 08114032247"</br>
                    <br>"Email : pusdalops.bpbdsulteng@gmail.com"</br>
                  </p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    
  );
};

export default KontakKamiPage;
