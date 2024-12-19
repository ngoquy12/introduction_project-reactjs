import { Button, Form, Input, message } from "antd";
import { HttpStatusCode } from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { login } from "@/services/authService";

// Cú pháp lưu cookie và lấy cookie

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Kiểm tra xem người dùng đã đăng nhập chưa, nếu rồi thì quay lại trang chủ
  useEffect(() => {
    // Kiểm tra token từ cookie
    const accessToken = Cookies.get("accessToken");

    const accountLogined =
      JSON.parse(localStorage.getItem("accountLogined")) || {};

    if (accessToken) {
      const checkIsAdmin = accountLogined?.roles.some(
        (role) => role === "ROLE_ADMIN"
      );

      if (checkIsAdmin) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, []);

  const onFinish = async (values) => {
    try {
      // Hiển thị loading
      setIsLoading(true);

      //1. Gọi API
      const response = await login(values);

      //2. Dùng dustructring để lấy ra các key của object
      const { accessToken, ...filtedData } = response;

      //3. Lưu token lên cookie hoặc local
      Cookies.set("accessToken", accessToken, {
        expires: 1,
        secure: true,
        sameSite: "strict",
      });

      //4. Lưu thông tin cá nhân của user đã đăng nhập lên localStorage
      localStorage.setItem("accountLogined", JSON.stringify(filtedData));

      // 5. Chuyển trang dựa vào quyền hạn
      // 5.1. Kiểm tra xem user có phải là admin không?
      const checkIsAdmin = filtedData?.roles.some(
        (role) => role === "ROLE_ADMIN"
      );

      // 5.... Kiểm tra các quyền còn lại

      if (checkIsAdmin) {
        // Điều hướng vê trang admin
        navigate("/admin");
      } else {
        // Điều hướng về trang user
        navigate("/");
      }

      // Hiển thị thông báo đăng nhập thành công
      message.success("Đăng nhập thành công");
    } catch (error) {
      if (error?.status === HttpStatusCode.BadRequest) {
        message.error(error?.response?.data?.error);
        return;
      } else {
        message.error("Máy chủ đang gặp sự cố. Vui lòng thử lại sau");
        return;
      }
    } finally {
      // Tắt hiệu ứng loading
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <div className="w-[450px] border px-6 py-5 rounded-lg shadow-sm">
          <header className="text-center font-semibold text-[24px] mb-6">
            <h3>Đăng nhập để sử dụng hệ thống</h3>
            <h3>Quản lý Ecommerce</h3>
          </header>

          <Form
            layout="vertical"
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              required={false}
              label={<span className="font-semibold">Email</span>}
              name="email"
              rules={[
                {
                  required: true,
                  message: "Email không được để trống",
                },
              ]}
            >
              <Input className="h-10" />
            </Form.Item>

            <Form.Item
              required={false}
              label={<span className="font-semibold">Mật khẩu</span>}
              name="password"
              rules={[
                {
                  required: true,
                  message: "Mật khẩu không được để trống",
                },
              ]}
            >
              <Input.Password className="h-10" />
            </Form.Item>
            <Form.Item label={null}>
              <Button
                loading={isLoading}
                className="w-full h-10"
                type="primary"
                htmlType="submit"
              >
                Đăng nhập
              </Button>

              <div className="text-center mt-4">
                <Link>Quên mật khẩu</Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}
