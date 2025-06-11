import { useGetNotAvailableYearsListQuery, useGetYearsListQuery } from '../features/app/services';

export const useLoadYears = () => {
    const {
        isError: getYearsListIsError,
        isSuccess: getYearsListIsSuccess,
        error: getYearsListError,
    } = useGetYearsListQuery();
    const {
        isError: getNotAvailableYearsListIsError,
        isSuccess: getNotAvailableYearsListIsSuccess,
        error: getNotAvailableYearsListError,
    } = useGetNotAvailableYearsListQuery();

    const isError = getYearsListIsError || getNotAvailableYearsListIsError;
    const isSuccess = getYearsListIsSuccess && getNotAvailableYearsListIsSuccess;
    const error = getYearsListError || getNotAvailableYearsListError;
    return {
        isError,
        isSuccess,
        error,
    };
};
