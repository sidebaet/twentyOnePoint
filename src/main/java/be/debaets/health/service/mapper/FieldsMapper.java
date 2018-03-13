package be.debaets.health.service.mapper;

import be.debaets.health.domain.*;
import be.debaets.health.service.dto.FieldsDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Fields and its DTO FieldsDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface FieldsMapper extends EntityMapper<FieldsDTO, Fields> {

    @Mapping(source = "user.id", target = "userId")
    FieldsDTO toDto(Fields fields);

    @Mapping(source = "userId", target = "user")
    Fields toEntity(FieldsDTO fieldsDTO);

    default Fields fromId(Long id) {
        if (id == null) {
            return null;
        }
        Fields fields = new Fields();
        fields.setId(id);
        return fields;
    }
}
