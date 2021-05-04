package es.us.lsi.dad.impl;

import java.time.LocalTime;

public class AlarmaImpl {

	protected Short oid_alarma;
	protected String dias;
	protected String estado;
	protected LocalTime t_inicio;
	protected LocalTime t_fin;
	protected Short t_trabajo;
	protected Short t_descanso;
	protected Short ciclo;
	protected String nif_fk;

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

	public AlarmaImpl(Short oid_alarma, String dias, String estado, LocalTime t_inicio, LocalTime t_fin,
			Short t_trabajo, Short t_descanso, Short ciclo, String nif_fk) {
		super();
		this.oid_alarma = oid_alarma;
		this.dias = dias;
		this.estado = estado;
		this.t_inicio = t_inicio;
		this.t_fin = t_fin;
		this.t_trabajo = t_trabajo;
		this.t_descanso = t_descanso;
		this.ciclo = ciclo;
		this.nif_fk = nif_fk;
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

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
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

	public Short getCiclo() {
		return ciclo;
	}

	public void setCiclo(Short ciclo) {
		this.ciclo = ciclo;
	}

	public String getNif_fk() {
		return nif_fk;
	}

	public void setNif_fk(String nif_fk) {
		this.nif_fk = nif_fk;
	}

	@Override
	public String toString() {
		return "AlarmaImpl [oid_alarma=" + oid_alarma + ", dias=" + dias + ", estado=" + estado + ", t_inicio="
				+ t_inicio + ", t_fin=" + t_fin + ", t_trabajo=" + t_trabajo + ", t_descanso=" + t_descanso + ", ciclo="
				+ ciclo + ", nif_fk=" + nif_fk + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((ciclo == null) ? 0 : ciclo.hashCode());
		result = prime * result + ((dias == null) ? 0 : dias.hashCode());
		result = prime * result + ((estado == null) ? 0 : estado.hashCode());
		result = prime * result + ((nif_fk == null) ? 0 : nif_fk.hashCode());
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
		if (ciclo == null) {
			if (other.ciclo != null)
				return false;
		} else if (!ciclo.equals(other.ciclo))
			return false;
		if (dias == null) {
			if (other.dias != null)
				return false;
		} else if (!dias.equals(other.dias))
			return false;
		if (estado == null) {
			if (other.estado != null)
				return false;
		} else if (!estado.equals(other.estado))
			return false;
		if (nif_fk == null) {
			if (other.nif_fk != null)
				return false;
		} else if (!nif_fk.equals(other.nif_fk))
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
