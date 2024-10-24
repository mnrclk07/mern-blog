import { useState, useEffect } from "react";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
import { BiHide, BiShow } from "react-icons/bi";

function SignIn() {
  // Form verilerini saklamak için state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { loading, error: errorMessage } = useSelector((state) => state.user); // Kullanıcı durumu
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form verilerinin güncellenmesi
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  // Formun gönderilmesi ve giriş işlemi
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Lütfen tüm alanları doldurun."));
    }

    // E-posta formatını kontrol et
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return dispatch(signInFailure("Geçersiz email formatı."));
    }

    if (formData.password.length < 6) {
      return dispatch(signInFailure("Şifre en az 6 karakter olmalıdır."));
    }

    try {
      dispatch(signInStart()); // Yükleme başlat
      // Hataları temizle
      dispatch(signInFailure(null));

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // Form verilerini gönder
      });

      const data = await res.json();

      // Başarısız giriş kontrolü
      if (!res.ok || data.success === false) {
        return dispatch(signInFailure(data.message || "Giriş başarısız oldu."));
      }

      dispatch(signInSuccess(data));

      // Giriş başarılı olduğunda formu temizle
      setFormData({
        email: "",
        password: "",
      });

      // Giriş sonrası yönlendirme
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message || "Bir hata oluştu."));
    }
  };

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        dispatch(signInFailure(null));
      }, 3000); // 3 saniye sonra hata mesajı kaybolur
      return () => clearTimeout(timer);
    }
  }, [errorMessage, dispatch]);
  return (
    <div className="min-h-screen mt-20 select-none">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-5 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-se-lg rounded-es-lg text-white">
              MERN
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            Bu bir demo projesidir. E-postanız ve şifrenizle kaydolabilirsiniz
            veya Google ile.
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Email" />
              <TextInput
                type="email"
                placeholder="isim@sirket.com"
                id="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Şifre" />
              <div className="relative">
                <TextInput
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <span
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <BiHide /> : <BiShow />}
                </span>
              </div>
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}>
              {loading ? (
                <>
                  <Spinner size="sm" />{" "}
                  <span className="pl-3">Yükleniyor...</span>
                </>
              ) : (
                "Giriş yap"
              )}
            </Button>

            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <Link to="/sign-up" className="text-blue-500">
              Kayıt ol
            </Link>
          </div>

          {/* Hata Mesajı Gösterimi */}
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignIn;
