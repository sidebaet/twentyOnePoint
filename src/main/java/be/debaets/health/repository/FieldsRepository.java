package be.debaets.health.repository;

import be.debaets.health.domain.Fields;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import java.util.List;

/**
 * Spring Data JPA repository for the Fields entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FieldsRepository extends JpaRepository<Fields, Long> {

    @Query("select fields from Fields fields where fields.user.login = ?#{principal.username}")
    List<Fields> findByUserIsCurrentUser();

}
