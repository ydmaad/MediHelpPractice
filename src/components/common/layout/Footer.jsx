import React from "react";
import MEDIHELP from "../../../assets/MEDIHELP.svg";
import { MdCopyright } from "react-icons/md";

const Footer = () => {
  return (
    <footer className=" bg-gray/50 h-16">
      <div className="flex justify-between items-center">
        <img src={MEDIHELP} alt="logo" />
        <div className="flex flex-col items-center space-y-2">
          <div className="flex justify-center gap-5 text-gray/600">
            <div>엔지니어 | 양민애</div>
            <div>디자이너 | 박유리 정수현</div>
          </div>
          <div className="text-center text-gray/600">
            이 프로젝트는 프론트엔드 개발자 6인과 UX/UI 디자이너 2인의 공동 개발
            프로젝트를 혼자 구현한 것입니다.
          </div>
        </div>
        <div className="flex justify-between items-center text-gray/600">
          <MdCopyright />
          2024 MEDIHELP. all right reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
