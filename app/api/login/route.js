import { loginFormSchema } from "@/schema/login-form.schema";
import { loginUser } from "@/lib/fetch/users/users";

export async function POST(request) {
  try {
    const body = await request.json();
    // Validar datos con el schema de Zod
    const data = loginFormSchema.parse(body);
    // Llamar a la función loginUser
    const result = await loginUser(data.email, data.password);
    return new Response(JSON.stringify({ success: true, data: result }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    // Si es error de Zod
    if (error.errors) {
      return new Response(JSON.stringify({
        success: false,
        message: "Datos inválidos. Corrige los campos e intenta de nuevo.",
        errors: error.errors
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    // Otro tipo de error
    return new Response(JSON.stringify({ success: false, message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
