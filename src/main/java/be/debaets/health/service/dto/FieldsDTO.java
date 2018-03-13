package be.debaets.health.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import be.debaets.health.domain.enumeration.Units;

/**
 * A DTO for the Fields entity.
 */
public class FieldsDTO implements Serializable {

    private Long id;

    @NotNull
    @Min(value = 10)
    @Max(value = 21)
    private Integer weeklyGoal;

    @NotNull
    private Units weightUnits;

    private Long userId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getWeeklyGoal() {
        return weeklyGoal;
    }

    public void setWeeklyGoal(Integer weeklyGoal) {
        this.weeklyGoal = weeklyGoal;
    }

    public Units getWeightUnits() {
        return weightUnits;
    }

    public void setWeightUnits(Units weightUnits) {
        this.weightUnits = weightUnits;
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

        FieldsDTO fieldsDTO = (FieldsDTO) o;
        if(fieldsDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), fieldsDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FieldsDTO{" +
            "id=" + getId() +
            ", weeklyGoal=" + getWeeklyGoal() +
            ", weightUnits='" + getWeightUnits() + "'" +
            "}";
    }
}
