package be.debaets.health.service.dto;


import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Weight entity.
 */
public class WeightDTO implements Serializable {

    private Long id;

    @NotNull
    private LocalDate dateTime;

    @NotNull
    private Double weight;

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

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
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

        WeightDTO weightDTO = (WeightDTO) o;
        if(weightDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), weightDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "WeightDTO{" +
            "id=" + getId() +
            ", dateTime='" + getDateTime() + "'" +
            ", weight=" + getWeight() +
            "}";
    }
}
