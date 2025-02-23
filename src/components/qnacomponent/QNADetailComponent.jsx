import React, { useEffect, useState } from "react";
import {answerQNA, getQNAOne, removeQNA} from "../../api/csapi/qnaAPI.js";
import {useNavigate, useParams} from "react-router-dom";
import CommonModal from "../../common/CommonModal.jsx";
import {useSelector} from "react-redux";

const init = {
    qno:0,
    qanswer: ""
};

function QnaDetailComponent() {
    const { qno } = useParams();
    const [formData, setFormData] = useState(init);
    const [editmodalOpen, setEditModalOpen] = useState(false);
    const [removemodalOpen, setRemoveModalOpen] = useState(false);

    const navigate = useNavigate();


    const auth = useSelector(state => state.auth);
    const admno = auth.admno


    const handleChange = (e) => {
        const { id, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [id]: value
        }))
    }


    const answerFn = () => {

        answerQNA(admno,formData).then((result) => {
            console.log("--------")
            console.log(result);
        });
    };

    const removeFn = () => {

        removeQNA(formData.qno).then((result) => {
            console.log(result);
        })
    }

    const handleEditClick = (e) => {
        e.preventDefault();
        setEditModalOpen(true);
    };

    const handleRemoveClick = (e) => {
        e.preventDefault();
        setRemoveModalOpen(true);
    };

    useEffect(() => {
        getQNAOne(qno).then((res) => {
            setFormData(res || init.qno);
        });
    }, [qno]);

    return (
        <>
            {editmodalOpen && (
                <CommonModal
                    isOpen={editmodalOpen}
                    msg={"등록"}
                    fn={answerFn}
                    closeModal={() => {
                        setEditModalOpen(false)
                        navigate('/qna/list');
                    }}
                />
            )}

            {removemodalOpen && (
                <CommonModal
                    isOpen={removemodalOpen}
                    msg={"삭제"}
                    fn={removeFn}
                    closeModal={() => {
                        setRemoveModalOpen(false)
                        navigate('/qna/list');
                    }}
                />
            )}

        <div className="max-w-5xl mx-auto bg-gray-50 rounded-lg shadow-md p-8 space-y-10 mt-10">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-4 mb-6">
                <h2 className="text-3xl font-bold text-gray-800">QNA 상세정보</h2>
                <button
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md shadow-sm transition duration-200"
                    onClick={() => history.back()}
                >
                    돌아가기
                </button>
            </div>

            {/* 정보 섹션 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 왼쪽 컬럼 */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-gray-500 font-medium mb-1">담당자 이름</label>
                        <input
                            id="adname"
                            type="text"
                            value={formData.admname}
                            readOnly
                            className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg shadow-sm text-gray-800"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-500 font-medium mb-1">질문 제목</label>
                        <input
                            id="qtitle"
                            type="text"
                            value={formData.qtitle}
                            readOnly
                            className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg shadow-sm text-gray-800"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-500 font-medium mb-1">작성자 이메일</label>
                        <input
                            id="uemail"
                            type="text"
                            value={formData.uemail || "N/A"}
                            readOnly
                            className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg shadow-sm text-gray-800"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-500 font-medium mb-1">등록일</label>
                        <input
                            id="qregdate"
                            type="text"
                            value={formData.qregdate ? new Date(formData.qregdate).toLocaleDateString() : "N/A"}
                            readOnly
                            className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg shadow-sm text-gray-800"
                        />
                    </div>
                </div>

                {/* 오른쪽 컬럼 */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-gray-500 font-medium mb-1">질문 내용</label>
                        <textarea
                            id="qcontent"
                            value={formData.qcontent}
                            readOnly
                            className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg shadow-sm text-gray-800 h-32 resize-none"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-gray-500 font-medium mb-1">답변 내용</label>
                        <textarea
                            id="qanswer"
                            value = {formData.qanswer || ""} // null이나 undefined일 때 빈 문자열 설정
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg shadow-sm text-gray-800 h-32 resize-none"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-gray-500 font-medium mb-1">수정일</label>
                        <input
                            id="qmoddate"
                            type="text"
                            value={formData.qmoddate ? new Date(formData.qmoddate).toLocaleDateString() : "N/A"}
                            readOnly
                            className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg shadow-sm text-gray-800"
                        />
                    </div>
                </div>
            </div>

            {/* 버튼 섹션 */}
            <div className="flex justify-end space-x-4">
                <button
                    className="px-6 py-3 bg-[#F9BB00] hover:bg-[#F9BB00] text-white font-semibold rounded-lg shadow-lg transform hover:-translate-y-1 hover:scale-105 transition duration-300 ease-in-out"
                    onClick={handleEditClick}
                >
                    수정하기
                </button>
                <button
                    className="px-6 py-3 bg-[#F57C00] hover:bg-[#F57C00] text-white font-semibold rounded-lg shadow-lg transform hover:-translate-y-1 hover:scale-105 transition duration-300 ease-in-out"
                    onClick={handleRemoveClick}
                >
                    삭제하기
                </button>
            </div>
        </div>
        </>
    );
}

export default QnaDetailComponent;