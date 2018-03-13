package be.debaets.health.web.rest;

import com.codahale.metrics.annotation.Timed;
import be.debaets.health.service.FieldsService;
import be.debaets.health.web.rest.errors.BadRequestAlertException;
import be.debaets.health.web.rest.util.HeaderUtil;
import be.debaets.health.web.rest.util.PaginationUtil;
import be.debaets.health.service.dto.FieldsDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Fields.
 */
@RestController
@RequestMapping("/api")
public class FieldsResource {

    private final Logger log = LoggerFactory.getLogger(FieldsResource.class);

    private static final String ENTITY_NAME = "fields";

    private final FieldsService fieldsService;

    public FieldsResource(FieldsService fieldsService) {
        this.fieldsService = fieldsService;
    }

    /**
     * POST  /fields : Create a new fields.
     *
     * @param fieldsDTO the fieldsDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new fieldsDTO, or with status 400 (Bad Request) if the fields has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/fields")
    @Timed
    public ResponseEntity<FieldsDTO> createFields(@Valid @RequestBody FieldsDTO fieldsDTO) throws URISyntaxException {
        log.debug("REST request to save Fields : {}", fieldsDTO);
        if (fieldsDTO.getId() != null) {
            throw new BadRequestAlertException("A new fields cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FieldsDTO result = fieldsService.save(fieldsDTO);
        return ResponseEntity.created(new URI("/api/fields/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /fields : Updates an existing fields.
     *
     * @param fieldsDTO the fieldsDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated fieldsDTO,
     * or with status 400 (Bad Request) if the fieldsDTO is not valid,
     * or with status 500 (Internal Server Error) if the fieldsDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/fields")
    @Timed
    public ResponseEntity<FieldsDTO> updateFields(@Valid @RequestBody FieldsDTO fieldsDTO) throws URISyntaxException {
        log.debug("REST request to update Fields : {}", fieldsDTO);
        if (fieldsDTO.getId() == null) {
            return createFields(fieldsDTO);
        }
        FieldsDTO result = fieldsService.save(fieldsDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, fieldsDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /fields : get all the fields.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of fields in body
     */
    @GetMapping("/fields")
    @Timed
    public ResponseEntity<List<FieldsDTO>> getAllFields(Pageable pageable) {
        log.debug("REST request to get a page of Fields");
        Page<FieldsDTO> page = fieldsService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/fields");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /fields/:id : get the "id" fields.
     *
     * @param id the id of the fieldsDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the fieldsDTO, or with status 404 (Not Found)
     */
    @GetMapping("/fields/{id}")
    @Timed
    public ResponseEntity<FieldsDTO> getFields(@PathVariable Long id) {
        log.debug("REST request to get Fields : {}", id);
        FieldsDTO fieldsDTO = fieldsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(fieldsDTO));
    }

    /**
     * DELETE  /fields/:id : delete the "id" fields.
     *
     * @param id the id of the fieldsDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/fields/{id}")
    @Timed
    public ResponseEntity<Void> deleteFields(@PathVariable Long id) {
        log.debug("REST request to delete Fields : {}", id);
        fieldsService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/fields?query=:query : search for the fields corresponding
     * to the query.
     *
     * @param query the query of the fields search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/fields")
    @Timed
    public ResponseEntity<List<FieldsDTO>> searchFields(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Fields for query {}", query);
        Page<FieldsDTO> page = fieldsService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/fields");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
