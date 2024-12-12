import {
  generateOrganizationProject,
  generateOrganizations,
} from "@/utils/fake/organization";
import { jwtDecode } from "jwt-decode";

export const getList = async () => {
  return generateOrganizations(20);
};

export const getProjects = async () => {
  return generateOrganizationProject(10);
};
