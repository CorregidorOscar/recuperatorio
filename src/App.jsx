import { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState({
    sending: false,
    success: false,
    error: null,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ sending: true, success: false, error: null });

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: {
            name: formData.name,
            email: formData.email,
            message: formData.message,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('No se pudo enviar el mensaje. Verifica la configuración de EmailJS')
      }

      setStatus({ sending: false, success: true, error: null });

      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (err) {
      setStatus({
        sending: false,
        success: false,
        error: err.message || 'Ocurrio un error al enviar el correo'
      });
    }
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      {/* Encabezado */}
      <div className="border-b border-dark/10 pb-6">
        <span className="inline-block bg-primary/10 text-primary font-semibold text-xs uppercase tracking-wider px-3 py-1 rounded-full mb-2">
          Atención al Interesado
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-dark">
          Contacto y Ubicación
        </h1>
        <p className="text-muted text-sm sm:text-base mt-1 max-w-2xl">
          Envíanos tu consulta para ponernos en contacto.
        </p>
      </div>

      {/* Layout de 2 columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

        {/* Formulario de Contacto */}
        <div className="bg-card p-6 sm:p-8 rounded-2xl border border-dark/10 shadow-xs">
          <h2 className="text-xl font-bold text-dark mb-1">
            Envíanos un mensaje
          </h2>
          <p className="text-xs text-muted mb-6">
            Completa el formulario y recibirás respuesta directamente en tu correo electrónico.
          </p>

          {/* Alerta de exito */}
          {
            status.success && (
              <div className="mb-6 p-4 rounded-xl bg-secondary/15 border border-secondary text-dark text-sm">
                <p className="font-bold">¡Mensaje enviado con éxito!</p>
                <p className="text-xs text-muted mt-0.5">
                  Hemos recibido tu consulta en nuestra casilla de correo. Te responderemos a la brevedad.
                </p>
              </div>
            )
          }

          {/* Alerta de Error */}
          {
            status.error && (
              <div className="mb-6 p-4 rounded-xl bg-primary/10 border border-primary text-primary text-sm">
                <p className="font-bold">Error al enviar</p>
                <p className="text-xs mt-0.5">{status.error}</p>
              </div>
            )
          }

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-dark mb-1.5"
              >
                Nombre completo *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Ej. Juan Pérez"
                className="w-full px-4 py-2.5 rounded-lg bg-surface border border-dark/15 text-dark placeholder:text-muted/60 text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-dark mb-1.5"
              >
                Correo electrónico *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@correo.com"
                className="w-full px-4 py-2.5 rounded-lg bg-surface border border-dark/15 text-dark placeholder:text-muted/60 text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-dark mb-1.5"
              >
                Mensaje o consulta *
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Haznos tu consulta"
                className="w-full px-4 py-2.5 rounded-lg bg-surface border border-dark/15 text-dark placeholder:text-muted/60 text-sm focus:outline-none focus:border-primary transition-colors resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={status.sending}
              className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              {status.sending ? 'Enviando mensaje...' : 'Enviar Consulta'}
            </button>
          </form>
        </div>

        {/* Mapa Embebido */}
        <div className="bg-card rounded-2xl border border-dark/10 shadow-xs overflow-hidden flex flex-col">
          <div className="bg-dark text-surface px-6 py-4 border-b border-white/10">
            <h2 className="text-lg font-bold">
              Dirección del Establecimiento
            </h2>
          </div>

          {/* Iframe de Google Maps */}
          <div className="w-full h-80 sm:h-96 bg-surface">
            <iframe
              title="Ubicación Oficina de Turismo Cafayate"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1811.726952812145!2d-65.40478573467259!3d-24.74562167518301!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x941bc1264c76c971%3A0x5fc7316c3bf2248!2sUPATecO%20-%20Universidad%20Provincial%20de%20Administraci%C3%B3n%2C%20Tecnolog%C3%ADa%20y%20Oficios!5e0!3m2!1ses!2sar!4v1794427375201!5m2!1ses!2sar"
              className="w-full h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

      </div>
    </section>
  );
}

export default Contact;