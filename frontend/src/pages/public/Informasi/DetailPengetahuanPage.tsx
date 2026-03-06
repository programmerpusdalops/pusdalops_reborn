/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from 'react-router-dom';
import * as api from '../../../utils/Api';
import parse from 'html-react-parser';
import { useEffect, useState } from 'react';

const DetailPengetahuanPage = () => {
    const [detail, setDetail] = useState<any>();
    const { id } = useParams();

    useEffect(() => {
        const LoadDetail = async () => {
            try {
                const response = await api.fetchPengetahuanById(id);
                setDetail(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        LoadDetail();
    }, [id]);

    return (
        <div>
            <div className="w-full lg:flex lg:gap-x-4">
                <div className="flex flex-col bg-white p-4 rounded-xl border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark w-full">
                    <div className="text-center text-black dark:text-gray text-title-sm md:text-title-md">
                        {detail?.judul}
                    </div>
                    <div className="text-[10px] text-center mt-1">
                        {detail?.penulis && (
                            <span>
                                {detail?.penulis} -{' '}
                                <span className="text-meta-6">BPBD PROV. SULTENG</span>
                            </span>
                        )}
                    </div>
                    <div className="text-[10px] text-center">
                        {detail?.tanggal}
                    </div>
                    {detail?.url && (
                        <div className="mt-4">
                            <img src={detail?.url} alt={detail?.judul} className="w-full px-5 rounded-lg" />
                        </div>
                    )}
                    <div className="w-full px-5 py-10">
                        {detail?.content && parse(String(detail?.content))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailPengetahuanPage;
