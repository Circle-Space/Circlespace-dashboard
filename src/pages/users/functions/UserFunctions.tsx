import { User } from "../types/userTypes"
import _ from "lodash";
import { formatStringDate } from "../../../utils/dateUtils";
import { SelectOption } from "../../../types/SelectOption";


export const formatSelectedRole = (selectedOption: SelectOption | null) => {
    if (!selectedOption) return [];

    return [
        {
            Id: selectedOption.value,
            Name: selectedOption.label,
            Description: selectedOption.description
        }
    ];
};



//multiple users
export const transformUsersData = (users: User[]): User[] => {
    return users.map(user => ({
        ...user,
        // Concatenate role names, or return a default value if no roles
        RolesString: user.Roles?.map(role => role.Name).join(", ") ?? "",
        FeaturesString: user.Roles?.flatMap(role => role.Features?.map(feature => feature.Name)).join(", ") ?? "",
    }));
}

//single user
export const transformUserData = (user: User): User & { RolesString: string; FeaturesString: string; } => {
    return {
        ...user,
        RolesString: user.Roles?.map(role => role.Name).join(", ") ?? "",
        FeaturesString: user.Features?.map(feature => feature.Name).join(", ") ?? "",
    } as User & { RolesString: string; FeaturesString: string; };
}

export const generateHeaderSections = (transformedUser: User & { RolesString: string; FeaturesString: string; }) => {
    const sections = [];

    //role
    if (!_.isNil(transformedUser.RolesString) && !_.isEmpty(transformedUser.RolesString.trim())) {
        sections.push({ title: "Role", value: transformedUser.RolesString });
    }


    //created at
    if (!_.isNil(transformedUser.CreatedAt) && !_.isEmpty(transformedUser.CreatedAt)) {

        const createdAtDate = new Date(transformedUser.CreatedAt);
        if (!isNaN(createdAtDate.getTime())) {
            const formattedCreatedAt = formatStringDate(createdAtDate.toISOString());
            if (!_.isEmpty(formattedCreatedAt.trim())) {
                sections.push({ title: "Created At", value: formattedCreatedAt });
            }
        }
    }

    //approved status

    if (!_.isNil(transformedUser.IsApproved)) {
        sections.push({ title: "Approved", value: transformedUser.IsApproved ? "Yes" : "No" });
    }


    return sections;
};