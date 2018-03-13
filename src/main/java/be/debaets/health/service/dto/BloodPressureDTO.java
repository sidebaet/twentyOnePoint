package be.debaets.health.service.dto;


import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the BloodPressure entity.
 */
public class BloodPressureDTO implements Serializable {

    private Long id;

    @NotNull
    private LocalDate dateTime;

    @Min(value = 10)
    @Max(value = 99)
    private Integer systolic;

    private Integer diastolic;

    private Long userId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDate dateTime) {
        this.dateTime = dateTime;
    }

    public Integer getSystolic() {
        return systolic;
    }

    public void setSystolic(Integer systolic) {
        this.systolic = systolic;
    }

    public Integer getDiastolic() {
        return diastolic;
    }

    public void setDiastolic(Integer diastolic) {
        this.diastolic = diastolic;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        BloodPressureDTO bloodPressureDTO = (BloodPressureDTO) o;
        if(bloodPressureDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), bloodPressureDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BloodPressureDTO{" +
            "id=" + getId() +
            ", dateTime='" + getDateTime() + "'" +
            ", systolic=" + getSystolic() +
            ", diastolic=" + getDiastolic() +
            "}";
    }
}
