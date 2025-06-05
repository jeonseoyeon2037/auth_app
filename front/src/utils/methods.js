/* ====== Common Post Request Function ====== */
export async function postFormRequest(url, options) {
  const response = await fetch(url, {
    ...options,
    headers:
      options.body instanceof FormData
        ? undefined
        : {
            'Content-Type': 'application/json',
          },
  });

  const responseData = await response.json();

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Something went wrong');
  }

  // return await response.json(); // { status, data } 형태로 반환
  return { status: response.status, data: responseData }; // 상태 코드와 데이터를 함께 반환
}

export async function postRequest(url, options) {
  const defaultOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    const data = await response.json();

    if (!response.ok) {
      // 상태 코드와 메시지를 포함하여 명확한 에러 전달
      throw { status: response.status, msg: data.msg || 'Request failed' };
    }

    return { status: response.status, data }; // 성공 시 상태 코드와 데이터를 반환
  } catch (error) {
    // 네트워크 오류나 다른 오류를 처리
    throw error.status
      ? error // 서버 응답 오류
      : { status: 500, msg: error.message || 'Unknown error occurred' }; // 네트워크 오류 등
  }
}
