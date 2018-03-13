package be.debaets.health.service.mapper;

import be.debaets.health.domain.*;
import be.debaets.health.service.dto.BloodPressureDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity BloodPressure and its DTO BloodPressureDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface BloodPressureMapper extends EntityMapper<BloodPressureDTO, BloodPressure> {

    @Mapping(source = "user.id", target = "userId")
    BloodPressureDTO toDto(BloodPressure bloodPressure);

    @Mapping(source = "userId", target = "user")
    BloodPressure toEntity(BloodPressureDTO bloodPressureDTO);

    default BloodPressure fromId(Long id) {
        if (id == null) {
            return null;
        }
        BloodPressure bloodPressure = new BloodPressure();
        bloodPressure.setId(id);
        return bloodPressure;
    }
}
