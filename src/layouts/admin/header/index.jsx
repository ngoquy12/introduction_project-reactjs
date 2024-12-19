import { Avatar, Button, Dropdown, Modal } from "antd";
import { Bell } from "lucide-react";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [isShowModal, setIsShowModal] = useState(false);

  // Lấy thông tin đăng nhập từ localStorage
  const accountLogined =
    JSON.parse(localStorage.getItem("accountLogined")) || {};

  // Hàm mở modal xác nhận xóa
  const handleShowModal = () => {
    setIsShowModal(true);
  };

  // Hàm đóng modal xác nhận xóa
  const handleCloseModal = () => {
    setIsShowModal(false);
  };

  const items = [
    {
      label: <div>Thông tin cá nhân</div>,
      key: "0",
    },
    {
      label: <div>Đổi mật khẩu</div>,
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: <div onClick={handleShowModal}>Đăng xuất</div>,
      key: "3",
    },
  ];

  // Hàm đăng xuất tài khoản
  const handleLogout = () => {
    // Xóa token khỏi cookie
    Cookies.remove("accessToken");

    // Xóa dữ liệu từ localStorage
    localStorage.removeItem("accountLogined");

    // Chuyển hướng về trang đăng nhập
    navigate("/login");
  };

  return (
    <>
      <Modal
        onClose={handleCloseModal}
        footer={
          <div className="flex justify-end gap-2">
            <Button onClick={handleCloseModal}>Hủy</Button>
            <Button onClick={handleLogout} type="primary" danger>
              Đăng xuất
            </Button>
          </div>
        }
        title="Xác nhận"
        open={isShowModal}
      >
        <p>Bạn có chắc chắn muốn đăng xuất không?</p>
      </Modal>

      <header className="w-full h-16 bg-slate-200 flex items-center justify-between px-12 ">
        <h2>LOGO</h2>
        <div className="flex items-center gap-5">
          <Bell />

          <Dropdown
            arrow
            placement="bottomLeft"
            menu={{
              items,
            }}
            trigger={["click"]}
          >
            <Avatar className="bg-orange-500">
              {accountLogined?.fullName?.charAt(0)}
            </Avatar>
          </Dropdown>
        </div>
      </header>
    </>
  );
}
