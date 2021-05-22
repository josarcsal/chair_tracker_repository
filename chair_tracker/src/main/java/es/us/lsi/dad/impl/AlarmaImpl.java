package es.us.lsi.dad.impl;

import java.time.LocalTime;

public class AlarmaImpl {

	protected Short oid_alarma;
	protected String dias;
	protected LocalTime t_inicio;
	protected LocalTime t_fin;
	protected Short t_trabajo;
	protected Short t_descanso;
	protected Short ciclo_trabajo;
	protected Short ciclo_descanso;
	protected String hash_mac_fk;

	public static LocalTime ParseaLocalTimeFromJson(String v) {
		LocalTime res;

		String[] trozosHoras = v.substring(2).split("H");
		Integer horas = Integer.valueOf(trozosHoras[0].trim());

		Integer minutos = 00;
		Integer segundos = 00;

		if (v.contains("M")) {
			String[] trozosMinutos = trozosHoras[1].split("M");
			minutos = Integer.valueOf(trozosMinutos[0].trim());
			if (v.contains("S")) {
				String[] trozosSegundos = trozosMinutos[1].split("S");
				segundos = Integer.valueOf(trozosSegundos[0].trim());
			}
		}

		res = LocalTime.of(horas, minutos, segundos);

		return res;
	}

	public AlarmaImpl() {
		super();
		// TODO Auto-generated constructor stub
	}

	public AlarmaImpl(Short oid_alarma, String dias, LocalTime t_inicio, LocalTime t_fin, Short t_trabajo,
			Short t_descanso, Short ciclo_trabajo, Short ciclo_descanso, String hash_mac_fk) {
		super();
		this.oid_alarma = oid_alarma;
		this.dias = dias;
		this.t_inicio = t_inicio;
		this.t_fin = t_fin;
		this.t_trabajo = t_trabajo;
		this.t_descanso = t_descanso;
		this.ciclo_trabajo = ciclo_trabajo;
		this.ciclo_descanso = ciclo_descanso;
		this.hash_mac_fk = hash_mac_fk;
	}

	public Short getOid_alarma() {
		return oid_alarma;
	}

	public void setOid_alarma(Short oid_alarma) {
		this.oid_alarma = oid_alarma;
	}

	public String getDias() {
		return dias;
	}

	public void setDias(String dias) {
		this.dias = dias;
	}

	public LocalTime getT_inicio() {
		return t_inicio;
	}

	public void setT_inicio(LocalTime t_inicio) {
		this.t_inicio = t_inicio;
	}

	public LocalTime getT_fin() {
		return t_fin;
	}

	public void setT_fin(LocalTime t_fin) {
		this.t_fin = t_fin;
	}

	public Short getT_trabajo() {
		return t_trabajo;
	}

	public void setT_trabajo(Short t_trabajo) {
		this.t_trabajo = t_trabajo;
	}

	public Short getT_descanso() {
		return t_descanso;
	}

	public void setT_descanso(Short t_descanso) {
		this.t_descanso = t_descanso;
	}

	public Short getCiclo_trabajo() {
		return ciclo_trabajo;
	}

	public void setCiclo_trabajo(Short ciclo_trabajo) {
		this.ciclo_trabajo = ciclo_trabajo;
	}

	public Short getCiclo_descanso() {
		return ciclo_descanso;
	}

	public void setCiclo_descanso(Short ciclo_descanso) {
		this.ciclo_descanso = ciclo_descanso;
	}

	public String getHash_mac_fk() {
		return hash_mac_fk;
	}

	public void setHash_mac_fk(String hash_mac_fk) {
		this.hash_mac_fk = hash_mac_fk;
	}

	@Override
	public String toString() {
		return "AlarmaImpl [oid_alarma=" + oid_alarma + ", dias=" + dias + ", t_inicio=" + t_inicio + ", t_fin=" + t_fin
				+ ", t_trabajo=" + t_trabajo + ", t_descanso=" + t_descanso + ", ciclo_trabajo=" + ciclo_trabajo
				+ ", ciclo_descanso=" + ciclo_descanso + ", hash_mac_fk=" + hash_mac_fk + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((ciclo_descanso == null) ? 0 : ciclo_descanso.hashCode());
		result = prime * result + ((ciclo_trabajo == null) ? 0 : ciclo_trabajo.hashCode());
		result = prime * result + ((dias == null) ? 0 : dias.hashCode());
		result = prime * result + ((hash_mac_fk == null) ? 0 : hash_mac_fk.hashCode());
		result = prime * result + ((oid_alarma == null) ? 0 : oid_alarma.hashCode());
		result = prime * result + ((t_descanso == null) ? 0 : t_descanso.hashCode());
		result = prime * result + ((t_fin == null) ? 0 : t_fin.hashCode());
		result = prime * result + ((t_inicio == null) ? 0 : t_inicio.hashCode());
		result = prime * result + ((t_trabajo == null) ? 0 : t_trabajo.hashCode());
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
		AlarmaImpl other = (AlarmaImpl) obj;
		if (ciclo_descanso == null) {
			if (other.ciclo_descanso != null)
				return false;
		} else if (!ciclo_descanso.equals(other.ciclo_descanso))
			return false;
		if (ciclo_trabajo == null) {
			if (other.ciclo_trabajo != null)
				return false;
		} else if (!ciclo_trabajo.equals(other.ciclo_trabajo))
			return false;
		if (dias == null) {
			if (other.dias != null)
				return false;
		} else if (!dias.equals(other.dias))
			return false;
		if (hash_mac_fk == null) {
			if (other.hash_mac_fk != null)
				return false;
		} else if (!hash_mac_fk.equals(other.hash_mac_fk))
			return false;
		if (oid_alarma == null) {
			if (other.oid_alarma != null)
				return false;
		} else if (!oid_alarma.equals(other.oid_alarma))
			return false;
		if (t_descanso == null) {
			if (other.t_descanso != null)
				return false;
		} else if (!t_descanso.equals(other.t_descanso))
			return false;
		if (t_fin == null) {
			if (other.t_fin != null)
				return false;
		} else if (!t_fin.equals(other.t_fin))
			return false;
		if (t_inicio == null) {
			if (other.t_inicio != null)
				return false;
		} else if (!t_inicio.equals(other.t_inicio))
			return false;
		if (t_trabajo == null) {
			if (other.t_trabajo != null)
				return false;
		} else if (!t_trabajo.equals(other.t_trabajo))
			return false;
		return true;
	}

}
