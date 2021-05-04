package es.us.lsi.dad.impl;

import java.time.LocalDateTime;

public class UsuarioImpl {
	 
	protected String nif;
	protected String contrasena;
	protected LocalDateTime last_login;
	protected String nombre;
	protected String apellidos;
	protected String rol;
	protected String nif_jefe;
		
	public static LocalDateTime ParseaLocalDateTimeFromJson(String v) {
		LocalDateTime res;
				
		if(v.contains("null")) {
			res = LocalDateTime.of(LocalDateTime.now().getYear(), LocalDateTime.now().getMonth(), LocalDateTime.now().getDayOfMonth(),
					LocalDateTime.now().getHour(), LocalDateTime.now().getMinute(), LocalDateTime.now().getSecond());
		}
		else {
			String [] trozos = v.split("T");
			
			String fecha = trozos[0].trim();
			String hora = trozos[trozos.length - 1].trim();
									
			String [] trozosFecha = fecha.split("-");
			Integer anyo = Integer.valueOf(trozosFecha[0].trim());
			Integer mes = Integer.valueOf(trozosFecha[1].trim());
			Integer dia = Integer.valueOf(trozosFecha[2].trim());
			

			String [] trozosHora = hora.split(":");
			Integer horas = Integer.valueOf(trozosHora[0].trim());
			Integer minutos = Integer.valueOf(trozosHora[0].trim());
			Integer segundos = 00;
			
			if(trozosHora.length == 3) {
				segundos = Integer.valueOf(trozosHora[2].trim());
			}

			res = LocalDateTime.of(anyo, mes, dia, horas, minutos, segundos);
		}
		return res;
	}

	public UsuarioImpl(String nif, String contrasena, LocalDateTime last_login, String nombre, String apellidos,
			String rol, String nif_jefe) {
		super();
		this.nif = nif;
		this.contrasena = contrasena;
		this.last_login = last_login;
		this.nombre = nombre;
		this.apellidos = apellidos;
		this.rol = rol;
		this.nif_jefe = nif_jefe;
	}
	
	public UsuarioImpl() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getNif() {
		return nif;
	}

	public void setNif(String nif) {
		this.nif = nif;
	}

	public String getContrasena() {
		return contrasena;
	}

	public void setContrasena(String contrasena) {
		this.contrasena = contrasena;
	}

	public LocalDateTime getLastLogin() {
		return last_login;
	}

	public void setLastLogin(LocalDateTime last_login) {
		this.last_login = last_login;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getApellidos() {
		return apellidos;
	}

	public void setApellidos(String apellidos) {
		this.apellidos = apellidos;
	}

	public String getRol() {
		return rol;
	}

	public void setRol(String rol) {
		this.rol = rol;
	}

	public String getNif_jefe() {
		return nif_jefe;
	}

	public void setNif_jefe(String nif_jefe) {
		this.nif_jefe = nif_jefe;
	}

	@Override
	public String toString() {
		return "UsuarioImpl [nif=" + nif + ", contrasena=" + contrasena + ", last_login=" + last_login + ", nombre="
				+ nombre + ", apellidos=" + apellidos + ", rol=" + rol + ", nif_jefe=" + nif_jefe + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((apellidos == null) ? 0 : apellidos.hashCode());
		result = prime * result + ((contrasena == null) ? 0 : contrasena.hashCode());
		result = prime * result + ((last_login == null) ? 0 : last_login.hashCode());
		result = prime * result + ((nif == null) ? 0 : nif.hashCode());
		result = prime * result + ((nif_jefe == null) ? 0 : nif_jefe.hashCode());
		result = prime * result + ((nombre == null) ? 0 : nombre.hashCode());
		result = prime * result + ((rol == null) ? 0 : rol.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		UsuarioImpl other = (UsuarioImpl) obj;
		if (apellidos == null) {
			if (other.apellidos != null)
				return false;
		} else if (!apellidos.equals(other.apellidos))
			return false;
		if (contrasena == null) {
			if (other.contrasena != null)
				return false;
		} else if (!contrasena.equals(other.contrasena))
			return false;
		if (last_login == null) {
			if (other.last_login != null)
				return false;
		} else if (!last_login.equals(other.last_login))
			return false;
		if (nif == null) {
			if (other.nif != null)
				return false;
		} else if (!nif.equals(other.nif))
			return false;
		if (nif_jefe == null) {
			if (other.nif_jefe != null)
				return false;
		} else if (!nif_jefe.equals(other.nif_jefe))
			return false;
		if (nombre == null) {
			if (other.nombre != null)
				return false;
		} else if (!nombre.equals(other.nombre))
			return false;
		if (rol == null) {
			if (other.rol != null)
				return false;
		} else if (!rol.equals(other.rol))
			return false;
		return true;
	}
}