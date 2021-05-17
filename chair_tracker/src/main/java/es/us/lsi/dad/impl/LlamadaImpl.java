package es.us.lsi.dad.impl;

public class LlamadaImpl {

	protected Short oid_llamada;
	protected String estado;
	protected String desde;
	protected String descripcion;
	protected String remitente_hash_mac_fk;
	protected String destinatario_hash_mac_fk;

	public LlamadaImpl(Short oid_llamada, String estado, String desde, String descripcion, String remitente_hash_mac_fk,
			String destinatario_hash_mac_fk) {
		super();
		this.oid_llamada = oid_llamada;
		this.estado = estado;
		this.desde = desde;
		this.descripcion = descripcion;
		this.remitente_hash_mac_fk = remitente_hash_mac_fk;
		this.destinatario_hash_mac_fk = destinatario_hash_mac_fk;
	}

	public LlamadaImpl() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Short getOid_llamada() {
		return oid_llamada;
	}

	public void setOid_llamada(Short oid_llamada) {
		this.oid_llamada = oid_llamada;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
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

	public String getRemitente_hash_mac_fk() {
		return remitente_hash_mac_fk;
	}

	public void setRemitente_hash_mac_fk(String remitente_hash_mac_fk) {
		this.remitente_hash_mac_fk = remitente_hash_mac_fk;
	}

	public String getDestinatario_hash_mac_fk() {
		return destinatario_hash_mac_fk;
	}

	public void setDestinatario_hash_mac_fk(String destinatario_hash_mac_fk) {
		this.destinatario_hash_mac_fk = destinatario_hash_mac_fk;
	}

	@Override
	public String toString() {
		return "LlamadaImpl [oid_llamada=" + oid_llamada + ", estado=" + estado + ", desde=" + desde + ", descripcion="
				+ descripcion + ", remitente_hash_mac_fk=" + remitente_hash_mac_fk + ", destinatario_hash_mac_fk="
				+ destinatario_hash_mac_fk + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((descripcion == null) ? 0 : descripcion.hashCode());
		result = prime * result + ((desde == null) ? 0 : desde.hashCode());
		result = prime * result + ((destinatario_hash_mac_fk == null) ? 0 : destinatario_hash_mac_fk.hashCode());
		result = prime * result + ((estado == null) ? 0 : estado.hashCode());
		result = prime * result + ((oid_llamada == null) ? 0 : oid_llamada.hashCode());
		result = prime * result + ((remitente_hash_mac_fk == null) ? 0 : remitente_hash_mac_fk.hashCode());
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
		LlamadaImpl other = (LlamadaImpl) obj;
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
		if (estado == null) {
			if (other.estado != null)
				return false;
		} else if (!estado.equals(other.estado))
			return false;
		if (oid_llamada == null) {
			if (other.oid_llamada != null)
				return false;
		} else if (!oid_llamada.equals(other.oid_llamada))
			return false;
		if (remitente_hash_mac_fk == null) {
			if (other.remitente_hash_mac_fk != null)
				return false;
		} else if (!remitente_hash_mac_fk.equals(other.remitente_hash_mac_fk))
			return false;
		return true;
	}
}
