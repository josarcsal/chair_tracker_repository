package es.us.lsi.dad.impl;

public class PlacaImpl {

	protected Short oid_placa;
	protected String nombre;
	protected String hash_mac_fk;
	protected String estado;

	public PlacaImpl(Short oid_placa, String nombre, String hash_mac_fk, String estado) {
		super();
		this.oid_placa = oid_placa;
		this.nombre = nombre;
		this.hash_mac_fk = hash_mac_fk;
		this.estado = estado;
	}

	public PlacaImpl() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Short getOid_placa() {
		return oid_placa;
	}

	public void setOid_placa(Short oid_placa) {
		this.oid_placa = oid_placa;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getHash_mac_fk() {
		return hash_mac_fk;
	}

	public void setHash_mac_fk(String hash_mac_fk) {
		this.hash_mac_fk = hash_mac_fk;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	@Override
	public String toString() {
		return "PlacaImpl [oid_placa=" + oid_placa + ", nombre=" + nombre + ", hash_mac_fk=" + hash_mac_fk + ", estado="
				+ estado + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((estado == null) ? 0 : estado.hashCode());
		result = prime * result + ((oid_placa == null) ? 0 : oid_placa.hashCode());
		result = prime * result + ((hash_mac_fk == null) ? 0 : hash_mac_fk.hashCode());
		result = prime * result + ((nombre == null) ? 0 : nombre.hashCode());
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
		PlacaImpl other = (PlacaImpl) obj;
		if (estado == null) {
			if (other.estado != null)
				return false;
		} else if (!estado.equals(other.estado))
			return false;
		if (oid_placa == null) {
			if (other.oid_placa != null)
				return false;
		} else if (!oid_placa.equals(other.oid_placa))
			return false;
		if (hash_mac_fk == null) {
			if (other.hash_mac_fk != null)
				return false;
		} else if (!hash_mac_fk.equals(other.hash_mac_fk))
			return false;
		if (nombre == null) {
			if (other.nombre != null)
				return false;
		} else if (!nombre.equals(other.nombre))
			return false;
		return true;
	}
}
