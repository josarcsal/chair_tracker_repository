package es.us.lsi.dad.impl;

import java.time.LocalDateTime;

public class RegistroImpl {

	protected Short oid_reg;
	protected String tipo;
	protected LocalDateTime fecha;
	protected Short trabajo;
	protected Short descanso;
	protected Short oid_llamada_fk;
	protected Short oid_alarma_fk;
	protected String hash_mac_fk;
	protected String remitente_hash_mac_fk;
	protected String remitente_nombre;
	protected String destinatario_hash_mac_fk;
	protected String destinatario_nombre;
	protected String desde;
	protected String descripcion;

	public RegistroImpl(Short oid_reg, String tipo, LocalDateTime fecha, Short trabajo, Short descanso,
			Short oid_llamada_fk, Short oid_alarma_fk, String hash_mac_fk, String remitente_hash_mac_fk, String remitente_nombre,
			String destinatario_hash_mac_fk, String destinatario_nombre, String desde, String descripcion) {
		super();
		this.oid_reg = oid_reg;
		this.tipo = tipo;
		this.fecha = fecha;
		this.trabajo = trabajo;
		this.descanso = descanso;
		this.oid_llamada_fk = oid_llamada_fk;
		this.oid_alarma_fk = oid_alarma_fk;
		this.hash_mac_fk = hash_mac_fk;
		this.remitente_hash_mac_fk = remitente_hash_mac_fk;
		this.remitente_nombre = remitente_nombre;
		this.destinatario_hash_mac_fk = destinatario_hash_mac_fk;
		this.destinatario_nombre = destinatario_nombre;
		this.desde = desde;
		this.descripcion = descripcion;
	}

	public RegistroImpl() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Short getOid_reg() {
		return oid_reg;
	}

	public void setOid_reg(Short oid_reg) {
		this.oid_reg = oid_reg;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public LocalDateTime getFecha() {
		return fecha;
	}

	public void setFecha(LocalDateTime fecha) {
		this.fecha = fecha;
	}

	public Short getTrabajo() {
		return trabajo;
	}

	public void setTrabajo(Short trabajo) {
		this.trabajo = trabajo;
	}

	public Short getDescanso() {
		return descanso;
	}

	public void setDescanso(Short descanso) {
		this.descanso = descanso;
	}

	public Short getOid_llamada_fk() {
		return oid_llamada_fk;
	}

	public void setOid_llamada_fk(Short oid_llamada_fk) {
		this.oid_llamada_fk = oid_llamada_fk;
	}

	public Short getOid_alarma_fk() {
		return oid_alarma_fk;
	}

	public void setOid_alarma_fk(Short oid_alarma_fk) {
		this.oid_alarma_fk = oid_alarma_fk;
	}

	public String getHash_mac_fk() {
		return hash_mac_fk;
	}

	public void sethash_mac_fk(String hash_mac_fk) {
		this.hash_mac_fk = hash_mac_fk;
	}

	public String getRemitente_hash_mac_fk() {
		return remitente_hash_mac_fk;
	}

	public void setRemitente_hash_mac_fk(String remitente_hash_mac_fk) {
		this.remitente_hash_mac_fk = remitente_hash_mac_fk;
	}

	public String getRemitente_nombre() {
		return remitente_nombre;
	}

	public void setRemitente_nombre(String remitente_nombre) {
		this.remitente_nombre = remitente_nombre;
	}

	public String getDestinatario_hash_mac_fk() {
		return destinatario_hash_mac_fk;
	}

	public void setDestinatario_hash_mac_fk(String destinatario_hash_mac_fk) {
		this.destinatario_hash_mac_fk = destinatario_hash_mac_fk;
	}

	public String getDestinatario_nombre() {
		return destinatario_nombre;
	}

	public void setDestinatario_nombre(String destinatario_nombre) {
		this.destinatario_nombre = destinatario_nombre;
	}

	public String getDesde() {
		return desde;
	}

	public void setDesde(String desde) {
		this.desde = desde;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	@Override
	public String toString() {
		return "RegistroImpl [oid_reg=" + oid_reg + ", tipo=" + tipo + ", fecha=" + fecha + ", trabajo=" + trabajo
				+ ", descanso=" + descanso + ", oid_llamada_fk=" + oid_llamada_fk + ", oid_alarma_fk=" + oid_alarma_fk
				+ ", hash_mac_fk=" + hash_mac_fk + ", remitente_hash_mac_fk=" + remitente_hash_mac_fk
				+ ", remitente_nombre=" + remitente_nombre + ", destinatario_hash_mac_fk=" + destinatario_hash_mac_fk
				+ ", destinatario_nombre=" + destinatario_nombre + ", desde=" + desde + ", descripcion=" + descripcion
				+ "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((descanso == null) ? 0 : descanso.hashCode());
		result = prime * result + ((descripcion == null) ? 0 : descripcion.hashCode());
		result = prime * result + ((desde == null) ? 0 : desde.hashCode());
		result = prime * result + ((destinatario_hash_mac_fk == null) ? 0 : destinatario_hash_mac_fk.hashCode());
		result = prime * result + ((destinatario_nombre == null) ? 0 : destinatario_nombre.hashCode());
		result = prime * result + ((fecha == null) ? 0 : fecha.hashCode());
		result = prime * result + ((hash_mac_fk == null) ? 0 : hash_mac_fk.hashCode());
		result = prime * result + ((oid_alarma_fk == null) ? 0 : oid_alarma_fk.hashCode());
		result = prime * result + ((oid_llamada_fk == null) ? 0 : oid_llamada_fk.hashCode());
		result = prime * result + ((oid_reg == null) ? 0 : oid_reg.hashCode());
		result = prime * result + ((remitente_hash_mac_fk == null) ? 0 : remitente_hash_mac_fk.hashCode());
		result = prime * result + ((remitente_nombre == null) ? 0 : remitente_nombre.hashCode());
		result = prime * result + ((tipo == null) ? 0 : tipo.hashCode());
		result = prime * result + ((trabajo == null) ? 0 : trabajo.hashCode());
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
		RegistroImpl other = (RegistroImpl) obj;
		if (descanso == null) {
			if (other.descanso != null)
				return false;
		} else if (!descanso.equals(other.descanso))
			return false;
		if (descripcion == null) {
			if (other.descripcion != null)
				return false;
		} else if (!descripcion.equals(other.descripcion))
			return false;
		if (desde == null) {
			if (other.desde != null)
				return false;
		} else if (!desde.equals(other.desde))
			return false;
		if (destinatario_hash_mac_fk == null) {
			if (other.destinatario_hash_mac_fk != null)
				return false;
		} else if (!destinatario_hash_mac_fk.equals(other.destinatario_hash_mac_fk))
			return false;
		if (destinatario_nombre == null) {
			if (other.destinatario_nombre != null)
				return false;
		} else if (!destinatario_nombre.equals(other.destinatario_nombre))
			return false;
		if (fecha == null) {
			if (other.fecha != null)
				return false;
		} else if (!fecha.equals(other.fecha))
			return false;
		if (hash_mac_fk == null) {
			if (other.hash_mac_fk != null)
				return false;
		} else if (!hash_mac_fk.equals(other.hash_mac_fk))
			return false;
		if (oid_alarma_fk == null) {
			if (other.oid_alarma_fk != null)
				return false;
		} else if (!oid_alarma_fk.equals(other.oid_alarma_fk))
			return false;
		if (oid_llamada_fk == null) {
			if (other.oid_llamada_fk != null)
				return false;
		} else if (!oid_llamada_fk.equals(other.oid_llamada_fk))
			return false;
		if (oid_reg == null) {
			if (other.oid_reg != null)
				return false;
		} else if (!oid_reg.equals(other.oid_reg))
			return false;
		if (remitente_hash_mac_fk == null) {
			if (other.remitente_hash_mac_fk != null)
				return false;
		} else if (!remitente_hash_mac_fk.equals(other.remitente_hash_mac_fk))
			return false;
		if (remitente_nombre == null) {
			if (other.remitente_nombre != null)
				return false;
		} else if (!remitente_nombre.equals(other.remitente_nombre))
			return false;
		if (tipo == null) {
			if (other.tipo != null)
				return false;
		} else if (!tipo.equals(other.tipo))
			return false;
		if (trabajo == null) {
			if (other.trabajo != null)
				return false;
		} else if (!trabajo.equals(other.trabajo))
			return false;
		return true;
	}
}
