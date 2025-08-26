import { Outlet } from 'react-router-dom';
import HeaderPublic from '../components/Module/HeaderPublic';
import LiveClock from '../components/Module/LiveClock';
import { FaCloudRain } from 'react-icons/fa6';

const PublicLayout = () => {
  const date = new Date()
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <HeaderPublic />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 md:px-20 2xl:p-10">
              <div className="flex mb-3 text-sm text-[##8d8d8d] items-center justify-center md:justify-start">
                <label className="pr-3 border-r">
                  <LiveClock />
                </label>
                <label className="pl-3 pr-3 border-r">{date.toDateString()}</label>
                <label className="px-3">Kota Palu</label>
                <FaCloudRain className="text-meta-5" />
              </div>
              <Outlet />
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default PublicLayout;
