import ReactPaginate from 'react-paginate';

interface Props {
  setLimit: any;
  rows: any;
  page: any;
  pages: any;
  changePage: any
}

export default function Pagination({
  setLimit,
  rows,
  page,
  pages,
  changePage,
} : Props) {
  return (
    <div className="mt-10 flex gap-6 flex-row justify-between ">
      <div className="w-16 xl:w-auto flex flex-col gap-10 flex-row px-2 py-1 sm:px-3">
        <div className="relative z-20 bg-transparent dark:bg-form-input">
          <select
            onChange={(e) => setLimit(e.target.value)}
            className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 px-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between bg-white px-2 py-1 sm:px-3 dark:border-strokedark dark:bg-boxdark">
        <div className="hidden sm:flex sm:flex-1 sm:items-center gap-10 sm:justify-between">
          <div>
            <p className='className="text-sm text-gray-700"'>
              Total data: <b>{rows}</b> | Halaman: <b>{rows ? page + 1 : 0}</b>{' '}
              dari <b>{pages}</b>{' '}
            </p>
          </div>
          <div>
            <ReactPaginate
              previousLabel={<span aria-hidden="true">&laquo;</span>}
              nextLabel={<span aria-hidden="true">&raquo;</span>}
              pageCount={Math.min(pages)}
              onPageChange={changePage}
              containerClassName={
                'isolate inline-flex -space-x-px rounded-md shadow-sm'
              }
              activeClassName={
                'relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-gray-700 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              }
              pageClassName={
                'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
              }
              previousLinkClassName={
                'relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
              }
              nextLinkClassName={
                'relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
