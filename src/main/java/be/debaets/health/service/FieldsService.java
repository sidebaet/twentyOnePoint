package be.debaets.health.service;

import be.debaets.health.service.dto.FieldsDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Fields.
 */
public interface FieldsService {

    /**
     * Save a fields.
     *
     * @param fieldsDTO the entity to save
     * @return the persisted entity
     */
    FieldsDTO save(FieldsDTO fieldsDTO);

    /**
     * Get all the fields.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<FieldsDTO> findAll(Pageable pageable);

    /**
     * Get the "id" fields.
     *
     * @param id the id of the entity
     * @return the entity
     */
    FieldsDTO findOne(Long id);

    /**
     * Delete the "id" fields.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the fields corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<FieldsDTO> search(String query, Pageable pageable);
}
