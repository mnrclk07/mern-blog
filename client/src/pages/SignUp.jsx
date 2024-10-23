import { useState } from "react";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Form verilerini kaydetme ve hata mesajını temizleme
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    setErrorMessage(null); // Veri girildikçe hata mesajı temizlenir
  };

  // Formu gönderme ve sunucuya istek yapma
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = formData;

    // Form doğrulama
    if (!username || !email || !password) {
      return setErrorMessage("Lütfen tüm alanları doldurun.");
    }

    // E-posta formatı doğrulama
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return setErrorMessage("Geçerli bir e-posta adresi giriniz.");
    }

    // Şifre doğrulama: minimum 6 karakter
    if (password.length < 6) {
      return setErrorMessage("Şifreniz en az 6 karakter olmalıdır.");
    }

    try {
      setLoading(true);
      setErrorMessage(null);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Kayıt işlemi başarısız.");
      }

      // Kayıt başarılıysa formu temizleyip yönlendir
      setFormData({
        username: "",
        email: "",
        password: "",
      });

      navigate("/sign-in");
    } catch (error) {
      setErrorMessage(error.message || "Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20">
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
            veya Google ile..
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Kullanıcı adı" />
              <TextInput
                type="text"
                placeholder="Kullanıcı adı"
                id="username"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Şifre" />
              <TextInput
                type="password"
                placeholder="*******"
                id="password"
                onChange={handleChange}
              />
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
                "Kayıt ol"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <Link to="/sign-in" className="text-blue-500">
              Giriş yap
            </Link>
          </div>
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

export default SignUp;
