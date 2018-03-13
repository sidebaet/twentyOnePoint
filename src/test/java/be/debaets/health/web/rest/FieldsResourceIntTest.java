package be.debaets.health.web.rest;

import be.debaets.health.TwentyOnePointApp;

import be.debaets.health.domain.Fields;
import be.debaets.health.repository.FieldsRepository;
import be.debaets.health.service.FieldsService;
import be.debaets.health.repository.search.FieldsSearchRepository;
import be.debaets.health.service.dto.FieldsDTO;
import be.debaets.health.service.mapper.FieldsMapper;
import be.debaets.health.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static be.debaets.health.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import be.debaets.health.domain.enumeration.Units;
/**
 * Test class for the FieldsResource REST controller.
 *
 * @see FieldsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TwentyOnePointApp.class)
public class FieldsResourceIntTest {

    private static final Integer DEFAULT_WEEKLY_GOAL = 10;
    private static final Integer UPDATED_WEEKLY_GOAL = 11;

    private static final Units DEFAULT_WEIGHT_UNITS = Units.KG;
    private static final Units UPDATED_WEIGHT_UNITS = Units.LB;

    @Autowired
    private FieldsRepository fieldsRepository;

    @Autowired
    private FieldsMapper fieldsMapper;

    @Autowired
    private FieldsService fieldsService;

    @Autowired
    private FieldsSearchRepository fieldsSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFieldsMockMvc;

    private Fields fields;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FieldsResource fieldsResource = new FieldsResource(fieldsService);
        this.restFieldsMockMvc = MockMvcBuilders.standaloneSetup(fieldsResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Fields createEntity(EntityManager em) {
        Fields fields = new Fields()
            .weeklyGoal(DEFAULT_WEEKLY_GOAL)
            .weightUnits(DEFAULT_WEIGHT_UNITS);
        return fields;
    }

    @Before
    public void initTest() {
        fieldsSearchRepository.deleteAll();
        fields = createEntity(em);
    }

    @Test
    @Transactional
    public void createFields() throws Exception {
        int databaseSizeBeforeCreate = fieldsRepository.findAll().size();

        // Create the Fields
        FieldsDTO fieldsDTO = fieldsMapper.toDto(fields);
        restFieldsMockMvc.perform(post("/api/fields")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fieldsDTO)))
            .andExpect(status().isCreated());

        // Validate the Fields in the database
        List<Fields> fieldsList = fieldsRepository.findAll();
        assertThat(fieldsList).hasSize(databaseSizeBeforeCreate + 1);
        Fields testFields = fieldsList.get(fieldsList.size() - 1);
        assertThat(testFields.getWeeklyGoal()).isEqualTo(DEFAULT_WEEKLY_GOAL);
        assertThat(testFields.getWeightUnits()).isEqualTo(DEFAULT_WEIGHT_UNITS);

        // Validate the Fields in Elasticsearch
        Fields fieldsEs = fieldsSearchRepository.findOne(testFields.getId());
        assertThat(fieldsEs).isEqualToIgnoringGivenFields(testFields);
    }

    @Test
    @Transactional
    public void createFieldsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = fieldsRepository.findAll().size();

        // Create the Fields with an existing ID
        fields.setId(1L);
        FieldsDTO fieldsDTO = fieldsMapper.toDto(fields);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFieldsMockMvc.perform(post("/api/fields")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fieldsDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Fields in the database
        List<Fields> fieldsList = fieldsRepository.findAll();
        assertThat(fieldsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkWeeklyGoalIsRequired() throws Exception {
        int databaseSizeBeforeTest = fieldsRepository.findAll().size();
        // set the field null
        fields.setWeeklyGoal(null);

        // Create the Fields, which fails.
        FieldsDTO fieldsDTO = fieldsMapper.toDto(fields);

        restFieldsMockMvc.perform(post("/api/fields")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fieldsDTO)))
            .andExpect(status().isBadRequest());

        List<Fields> fieldsList = fieldsRepository.findAll();
        assertThat(fieldsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkWeightUnitsIsRequired() throws Exception {
        int databaseSizeBeforeTest = fieldsRepository.findAll().size();
        // set the field null
        fields.setWeightUnits(null);

        // Create the Fields, which fails.
        FieldsDTO fieldsDTO = fieldsMapper.toDto(fields);

        restFieldsMockMvc.perform(post("/api/fields")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fieldsDTO)))
            .andExpect(status().isBadRequest());

        List<Fields> fieldsList = fieldsRepository.findAll();
        assertThat(fieldsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllFields() throws Exception {
        // Initialize the database
        fieldsRepository.saveAndFlush(fields);

        // Get all the fieldsList
        restFieldsMockMvc.perform(get("/api/fields?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fields.getId().intValue())))
            .andExpect(jsonPath("$.[*].weeklyGoal").value(hasItem(DEFAULT_WEEKLY_GOAL)))
            .andExpect(jsonPath("$.[*].weightUnits").value(hasItem(DEFAULT_WEIGHT_UNITS.toString())));
    }

    @Test
    @Transactional
    public void getFields() throws Exception {
        // Initialize the database
        fieldsRepository.saveAndFlush(fields);

        // Get the fields
        restFieldsMockMvc.perform(get("/api/fields/{id}", fields.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(fields.getId().intValue()))
            .andExpect(jsonPath("$.weeklyGoal").value(DEFAULT_WEEKLY_GOAL))
            .andExpect(jsonPath("$.weightUnits").value(DEFAULT_WEIGHT_UNITS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFields() throws Exception {
        // Get the fields
        restFieldsMockMvc.perform(get("/api/fields/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFields() throws Exception {
        // Initialize the database
        fieldsRepository.saveAndFlush(fields);
        fieldsSearchRepository.save(fields);
        int databaseSizeBeforeUpdate = fieldsRepository.findAll().size();

        // Update the fields
        Fields updatedFields = fieldsRepository.findOne(fields.getId());
        // Disconnect from session so that the updates on updatedFields are not directly saved in db
        em.detach(updatedFields);
        updatedFields
            .weeklyGoal(UPDATED_WEEKLY_GOAL)
            .weightUnits(UPDATED_WEIGHT_UNITS);
        FieldsDTO fieldsDTO = fieldsMapper.toDto(updatedFields);

        restFieldsMockMvc.perform(put("/api/fields")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fieldsDTO)))
            .andExpect(status().isOk());

        // Validate the Fields in the database
        List<Fields> fieldsList = fieldsRepository.findAll();
        assertThat(fieldsList).hasSize(databaseSizeBeforeUpdate);
        Fields testFields = fieldsList.get(fieldsList.size() - 1);
        assertThat(testFields.getWeeklyGoal()).isEqualTo(UPDATED_WEEKLY_GOAL);
        assertThat(testFields.getWeightUnits()).isEqualTo(UPDATED_WEIGHT_UNITS);

        // Validate the Fields in Elasticsearch
        Fields fieldsEs = fieldsSearchRepository.findOne(testFields.getId());
        assertThat(fieldsEs).isEqualToIgnoringGivenFields(testFields);
    }

    @Test
    @Transactional
    public void updateNonExistingFields() throws Exception {
        int databaseSizeBeforeUpdate = fieldsRepository.findAll().size();

        // Create the Fields
        FieldsDTO fieldsDTO = fieldsMapper.toDto(fields);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restFieldsMockMvc.perform(put("/api/fields")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fieldsDTO)))
            .andExpect(status().isCreated());

        // Validate the Fields in the database
        List<Fields> fieldsList = fieldsRepository.findAll();
        assertThat(fieldsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteFields() throws Exception {
        // Initialize the database
        fieldsRepository.saveAndFlush(fields);
        fieldsSearchRepository.save(fields);
        int databaseSizeBeforeDelete = fieldsRepository.findAll().size();

        // Get the fields
        restFieldsMockMvc.perform(delete("/api/fields/{id}", fields.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean fieldsExistsInEs = fieldsSearchRepository.exists(fields.getId());
        assertThat(fieldsExistsInEs).isFalse();

        // Validate the database is empty
        List<Fields> fieldsList = fieldsRepository.findAll();
        assertThat(fieldsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchFields() throws Exception {
        // Initialize the database
        fieldsRepository.saveAndFlush(fields);
        fieldsSearchRepository.save(fields);

        // Search the fields
        restFieldsMockMvc.perform(get("/api/_search/fields?query=id:" + fields.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fields.getId().intValue())))
            .andExpect(jsonPath("$.[*].weeklyGoal").value(hasItem(DEFAULT_WEEKLY_GOAL)))
            .andExpect(jsonPath("$.[*].weightUnits").value(hasItem(DEFAULT_WEIGHT_UNITS.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Fields.class);
        Fields fields1 = new Fields();
        fields1.setId(1L);
        Fields fields2 = new Fields();
        fields2.setId(fields1.getId());
        assertThat(fields1).isEqualTo(fields2);
        fields2.setId(2L);
        assertThat(fields1).isNotEqualTo(fields2);
        fields1.setId(null);
        assertThat(fields1).isNotEqualTo(fields2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(FieldsDTO.class);
        FieldsDTO fieldsDTO1 = new FieldsDTO();
        fieldsDTO1.setId(1L);
        FieldsDTO fieldsDTO2 = new FieldsDTO();
        assertThat(fieldsDTO1).isNotEqualTo(fieldsDTO2);
        fieldsDTO2.setId(fieldsDTO1.getId());
        assertThat(fieldsDTO1).isEqualTo(fieldsDTO2);
        fieldsDTO2.setId(2L);
        assertThat(fieldsDTO1).isNotEqualTo(fieldsDTO2);
        fieldsDTO1.setId(null);
        assertThat(fieldsDTO1).isNotEqualTo(fieldsDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(fieldsMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(fieldsMapper.fromId(null)).isNull();
    }
}
