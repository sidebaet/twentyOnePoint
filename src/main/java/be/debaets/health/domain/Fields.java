package be.debaets.health.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

import be.debaets.health.domain.enumeration.Units;

/**
 * A Fields.
 */
@Entity
@Table(name = "fields")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "fields")
public class Fields implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Min(value = 10)
    @Max(value = 21)
    @Column(name = "weekly_goal", nullable = false)
    private Integer weeklyGoal;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "weight_units", nullable = false)
    private Units weightUnits;

    @ManyToOne
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getWeeklyGoal() {
        return weeklyGoal;
    }

    public Fields weeklyGoal(Integer weeklyGoal) {
        this.weeklyGoal = weeklyGoal;
        return this;
    }

    public void setWeeklyGoal(Integer weeklyGoal) {
        this.weeklyGoal = weeklyGoal;
    }

    public Units getWeightUnits() {
        return weightUnits;
    }

    public Fields weightUnits(Units weightUnits) {
        this.weightUnits = weightUnits;
        return this;
    }

    public void setWeightUnits(Units weightUnits) {
        this.weightUnits = weightUnits;
    }

    public User getUser() {
        return user;
    }

    public Fields user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Fields fields = (Fields) o;
        if (fields.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), fields.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Fields{" +
            "id=" + getId() +
            ", weeklyGoal=" + getWeeklyGoal() +
            ", weightUnits='" + getWeightUnits() + "'" +
            "}";
    }
}
