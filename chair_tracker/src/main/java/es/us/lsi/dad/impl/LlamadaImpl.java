package es.us.lsi.dad.impl;

public class LlamadaImpl {

	protected Short oid_llamada;
	protected String estado;
	protected String desde;
	protected String descripcion;
	protected String remitente_nif_fk;
	protected String destinatario_nif_fk;
	
	public LlamadaImpl(Short oid_llamada, String estado, String desde, String descripcion, String remitente_nif_fk,
			String destinatario_nif_fk) {
		super();
		this.oid_llamada = oid_llamada;
		this.estado = estado;
		this.desde = desde;
		this.descripcion = descripcion;
		this.remitente_nif_fk = remitente_nif_fk;
		this.destinatario_nif_fk = destinatario_nif_fk;
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

	public String getRemitente_nif_fk() {
		return remitente_nif_fk;
	}

	public void setRemitente_nif_fk(String remitente_nif_fk) {
		this.remitente_nif_fk = remitente_nif_fk;
	}

	public String getDestinatario_nif_fk() {
		return destinatario_nif_fk;
	}

	public void setDestinatario_nif_fk(String destinatario_nif_fk) {
		this.destinatario_nif_fk = destinatario_nif_fk;
	}

	@Override
	public String toString() {
		return "LlamadaImpl [oid_llamada=" + oid_llamada + ", estado=" + estado + ", desde=" + desde + ", descripcion="
				+ descripcion + ", remitente_nif_fk=" + remitente_nif_fk + ", destinatario_nif_fk="
				+ destinatario_nif_fk + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((descripcion == null) ? 0 : descripcion.hashCode());
		result = prime * result + ((desde == null) ? 0 : desde.hashCode());
		result = prime * result + ((destinatario_nif_fk == null) ? 0 : destinatario_nif_fk.hashCode());
		result = prime * result + ((estado == null) ? 0 : estado.hashCode());
		result = prime * result + ((oid_llamada == null) ? 0 : oid_llamada.hashCode());
		result = prime * result + ((remitente_nif_fk == null) ? 0 : remitente_nif_fk.hashCode());
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
		if (destinatario_nif_fk == null) {
			if (other.destinatario_nif_fk != null)
				return false;
		} else if (!destinatario_nif_fk.equals(other.destinatario_nif_fk))
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
		if (remitente_nif_fk == null) {
			if (other.remitente_nif_fk != null)
				return false;
		} else if (!remitente_nif_fk.equals(other.remitente_nif_fk))
			return false;
		return true;
	}	
}
