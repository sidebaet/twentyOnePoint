package be.debaets.health.service;

import be.debaets.health.service.dto.BloodPressureDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing BloodPressure.
 */
public interface BloodPressureService {

    /**
     * Save a bloodPressure.
     *
     * @param bloodPressureDTO the entity to save
     * @return the persisted entity
     */
    BloodPressureDTO save(BloodPressureDTO bloodPressureDTO);

    /**
     * Get all the bloodPressures.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<BloodPressureDTO> findAll(Pageable pageable);

    /**
     * Get the "id" bloodPressure.
     *
     * @param id the id of the entity
     * @return the entity
     */
    BloodPressureDTO findOne(Long id);

    /**
     * Delete the "id" bloodPressure.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the bloodPressure corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<BloodPressureDTO> search(String query, Pageable pageable);
}
